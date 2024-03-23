import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import { Activity } from 'src/app/Models/Activity';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/Models/Event';
import {PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import * as bootstrap from 'bootstrap';




@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.css'],
})
export class GetActivityComponentFront implements OnInit {
  activities: Activity[] = [];
  events: Event[] = [];
  totalActivities = 0;
  currentPage = 0;
  pageSize = 9;
  totalPages = 0;
  activityForm: FormGroup;
  @ViewChild('myModal') myModal!: ElementRef;


  constructor(
    private activityServiceF: ActivityService,
    private router: Router ,
    private location: Location,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,)
{
  this.activityForm = this.formBuilder.group({
    activity_name: ['', Validators.required],
    description: ['', Validators.required],
    startTime: ['', Validators.required],
    finishTime: ['', Validators.required],
    event: ['', Validators.required]
  });
}

  loadActivitiesFront(pageIndex: number, pageSize: number): void {
    this.activityServiceF.findAllActivities(pageIndex, pageSize).subscribe(response => {
      this.activities = response.content;
      this.totalActivities = response.totalElements;
      this.totalPages = Math.ceil(this.totalActivities / this.pageSize);
    }, error => {
      console.error('Error fetching activities:', error);
    });
  }
  nextPage(): void {
    if (this.currentPage < (this.totalActivities / this.pageSize) - 1) {
      this.currentPage++;
      this.loadActivitiesFront(this.currentPage, this.pageSize);
    }
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadActivitiesFront(this.currentPage, this.pageSize);
    }
  }
  loadEvents(): void {
    this.activityServiceF.getAllEventsWithName().subscribe(
      events => {
        this.events = events;
        console.log('Events:', this.events);
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadActivitiesFront(this.currentPage, this.pageSize);
    this.loadEvents();

  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadActivitiesFront(this.currentPage, this.pageSize);
  }

  goBack() {
    this.location.back();
  }
  updateActivity(activity_id: number): void {
    this.router.navigate([`/ActivityF/updateactivityF/${activity_id}`]);
  }

  deleteActivity(activity_id : number): void {
    console.log('Activity ID:', activity_id );
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activityServiceF.deleteActivity(activity_id ).subscribe(
        () => {
          console.log('Activity deleted successfully.');
          alert('Activity deleted successfully.');
          this.loadActivitiesFront(this.currentPage, this.pageSize);
        },
        error => {
          console.error('Error deleting activity:', error);
        }
      );
    }
  }

  navigateToAddActivity(): void {
    this.router.navigate(['/ActivityF/AddActivityF']);
  }

  getEventName(activity: Activity): string {
    return activity.event ? activity.event.event_name : 'No Event';
  }
  // closeModal(): void {
  //   const modalElement: HTMLElement = this.myModal.nativeElement;
  //   const modalInstance = bootstrap.Modal.getInstance(modalElement);
  //   if (modalInstance) {
  //     modalInstance.hide();
  //   } else {
  //     // Handle the case where there is no modal instance.
  //     // This could involve logging an error, doing nothing, or taking some other action.
  //     console.error('No Bootstrap modal instance found for the modal element.');
  //   }
  // }
  closeModal(): void {
    const modalElement = this.myModal.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      console.log("Closing modal...");
      modalInstance.hide();

      // Ensure Angular is aware of the update and can run its change detection.
      // This is useful if hiding the modal results in changes to the data that should be immediately reflected in the UI.
      this.ngZone.run(() => {
        // You might want to reset the form or update UI elements here.
        // For example, if you're resetting a form inside the modal:
        // this.activityForm.reset();

        // Manually trigger Angular's change detection to update the view.
        this.cdr.detectChanges();
      });
    } else {
      console.error("Could not find Bootstrap modal instance.");
    }
  }







  onSubmit() {
    if (this.activityForm.valid) {
      const activity: Activity = this.activityForm.value;

      if (activity.event && activity.event.event_id) {
        console.log('Activity to add:', activity);

        this.activityServiceF.addActivity(activity, activity.event.event_id).subscribe(
          (addedActivity: Activity) => {
            console.log('Activity added successfully:', addedActivity);
            alert('Activity added successfully!');
            this.activityForm.reset();
            this.loadActivitiesFront(this.currentPage, this.pageSize);
            this.cdr.detectChanges();

           // this.router.navigate(['/ActivityF/allactivitiesF']);
          },
          error => {
            console.error('Error adding activity:', error);
          }
        );
      } else {
        console.error('Event ID is missing in the activity form.');
      }
    }
  }


}
