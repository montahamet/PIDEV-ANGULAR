import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import { Activity } from 'src/app/Models/Activity';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/Models/Event';
import {PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl} from "@angular/forms";
import {Location} from "@angular/common";
import * as bootstrap from 'bootstrap';


export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const group = control as FormGroup;
  const start = group.get('startTime')?.value;
  const end = group.get('finishTime')?.value;
  // Check if both start and end values are present before validating
  if (start && end) {
    return start < end ? null : { dateRange: true };
  }
  return null; // No error if one or both fields are empty
};
@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.css'],
})


export class GetActivityComponentFront implements OnInit {
  activities: Activity[] = [];
  activity: Activity = new Activity();
  events: Event[] = [];
  totalActivities = 0;
  currentPage = 0;
  pageSize = 9;
  totalPages = 0;
  activityForm: FormGroup;
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('warningSuccessModal') warningSuccessModal!: ElementRef;
  warningMessage: string = '';
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ElementRef;
  private activityIdToDelete!: number;
  updateActivityForm!: FormGroup;
  @ViewChild('updateActivityModal', { static: true }) updateActivityModal!: ElementRef;
  selectedActivity: Activity | null = null;
  searchTerm: string = '';
  filteredActivities: Activity[] = [];
  allActivities: Activity[] = [];

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
  }, { validators: dateRangeValidator });
  this.updateActivityForm = this.formBuilder.group({
    activity_name: ['', Validators.required],
    description: ['', Validators.required],
    startTime: ['', Validators.required],
    finishTime: ['', Validators.required],
    event: ['', Validators.required]
  }, { validators: dateRangeValidator });
}
  ngOnInit(): void {
    this.loadActivitiesFront(this.currentPage, this.pageSize);
    this.loadEvents();

  }
  shouldShowDateRangeError(): boolean {
    const form = this.activityForm;
    const startTimeFilled = !!form.get('startTime')?.value;
    const finishTimeFilled = !!form.get('finishTime')?.value;
    const hasDateRangeError = !!form.errors?.['dateRange'];

    return startTimeFilled && finishTimeFilled && hasDateRangeError;
  }

  showModalWithMessage(message: string): void {
    this.warningMessage = message;
    const modalInstance = new bootstrap.Modal(this.warningSuccessModal.nativeElement);
    modalInstance.show();
  }
  openUpdateModal(activity: Activity): void {
    this.updateActivityForm.patchValue({
      activity_id: activity.activity_id,
      activity_name: activity.activity_name,
      description: activity.description,
      startTime: activity.startTime,
      finishTime: activity.finishTime,
      event: activity.event.event_id
    });

    // Ensure change detection has run to update the view
    this.cdr.detectChanges();

    // Use a timeout to allow the view to update and modal to be ready in the DOM
    setTimeout(() => {
      if (this.updateActivityModal && this.updateActivityModal.nativeElement) {
        const modalInstance = new bootstrap.Modal(this.updateActivityModal.nativeElement);
        modalInstance.show();
      } else {
        console.error('Update activity modal element is not available.');
      }
    }, 0);
  }

  askDeleteConfirmation(activityId: number): void {
    this.activityIdToDelete = activityId;
    const modal = new bootstrap.Modal(this.deleteConfirmationModal.nativeElement);
    modal.show();
  }
  confirmDeletion(): void {
    this.activityServiceF.deleteActivity(this.activityIdToDelete).subscribe({
      next: () => {
        this.showModalWithMessage('Activity deleted successfully!');
        this.loadActivitiesFront(this.currentPage, this.pageSize); // Refresh the activities list
      },
      error: () => {
        this.showModalWithMessage('Error deleting the activity. Please try again.');
      }
    });

    const modalInstance = bootstrap.Modal.getInstance(this.deleteConfirmationModal.nativeElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }


  loadActivitiesFront(pageIndex: number, pageSize: number): void {
    this.activityServiceF.findAllActivities(pageIndex, pageSize).subscribe(response => {
      this.allActivities = response.content; // Store all activities
      this.filteredActivities = [...this.allActivities]; // Set filteredActivities to allActivities initially
      this.totalActivities = response.totalElements;
      this.totalPages = response.totalPages || Math.ceil(this.totalActivities / this.pageSize);
    }, error => {
      console.error('Error fetching activities:', error);
    });
  }


  filterActivities(): void {
    if (!this.searchTerm) {
      this.filteredActivities = [...this.allActivities]; // Reset to the full list
    } else {
      this.filteredActivities = this.allActivities.filter(activity =>
        activity.activity_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
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


  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadActivitiesFront(this.currentPage, this.pageSize);
  }

  goBack() {
    this.location.back();
  }
  updateActivity(activity_id: number): void {
    this.router.navigate([`/ActivityF/updateActivityF/${activity_id}`]);
  }

  // deleteActivity(activity_id : number): void {
  //   console.log('Activity ID:', activity_id );
  //   if (confirm('Are you sure you want to delete this activity?')) {
  //     this.activityServiceF.deleteActivity(activity_id ).subscribe(
  //       () => {
  //         console.log('Activity deleted successfully.');
  //         alert('Activity deleted successfully.');
  //         this.loadActivitiesFront(this.currentPage, this.pageSize);
  //       },
  //       error => {
  //         console.error('Error deleting activity:', error);
  //       }
  //     );
  //   }
  // }



  getEventName(activity: Activity): string {
    return activity.event ? activity.event.event_name : 'No Event';
  }
  get formErrors() {
    return this.activityForm.errors || {};
  }
  showUpdateModal(activity: Activity): void {
    this.selectedActivity = activity;
    this.updateActivityForm.patchValue({
      activity_id: activity.activity_id,
      activity_name: activity.activity_name,
      description: activity.description,
      startTime: activity.startTime,
      finishTime: activity.finishTime,
      event: activity.event.event_id
    });
    // Assuming you have a reference to the modal element
    const modal = new bootstrap.Modal(this.updateActivityModal.nativeElement);
    modal.show();
  }
  onSubmit() {
    if (this.activityForm.valid) {
      const activity: Activity = this.activityForm.value;

      if (activity.event && activity.event.event_id) {
        console.log('Activity to add:', activity);
        this.showModalWithMessage('Activity added successfully!');

        this.activityServiceF.addActivity(activity, activity.event.event_id).subscribe(
          (addedActivity: Activity) => {
            console.log('Activity added successfully:', addedActivity);
            this.activityForm.reset();
            this.loadActivitiesFront(this.currentPage, this.pageSize);
            this.cdr.detectChanges();

            // this.router.navigate(['/ActivityF/allactivitiesF']);
          },
          error => {
            console.error('Error adding activity:', error);
            this.showModalWithMessage('Error adding activity. Please try again.');

          }
        );
      }else if (this.activityForm.valid){
        const updatedActivity = new Activity();
        const formValues = this.activityForm.value;
        updatedActivity.activity_id = this.activity.activity_id;
        updatedActivity.activity_name = formValues.activity_name;
        updatedActivity.description = formValues.description;
        updatedActivity.startTime = new Date(formValues.startTime);
        updatedActivity.finishTime = new Date(formValues.finishTime);
        updatedActivity.event = { event_id: formValues.event } as Event;

        this.activityServiceF.updateActivity(updatedActivity, formValues.event).subscribe(
          () => {
            alert('Activity updated successfully.');
            this.router.navigate(['/ActivityF/getActivityF']);
          });
      } else {
        console.error('Event ID is missing in the activity form.');
      }
    }
  }
  onSubmitUpdate() {
    if (this.updateActivityForm.valid) {
      const updatedActivity = this.updateActivityForm.value;
      const formValues = this.activityForm.value;

      this.activityServiceF.updateActivity(updatedActivity, formValues.event).subscribe(
        () => {
          console.log('Activity updated successfully');
          this.loadActivitiesFront(this.currentPage, this.pageSize);
          // bootstrap.Modal.getInstance(this.updateActivityModal.nativeElement).hide();
        },
        error => console.error('Error updating activity', error)
      );
    }
  }

}
