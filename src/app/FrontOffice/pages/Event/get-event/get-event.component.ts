import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Event } from 'src/app/Models/Event';
import { EventService } from 'src/app/Services/Event.service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/app/Models/User';
import { Activity } from 'src/app/Models/Activity';
import { RegistrationEvent } from 'src/app/Models/RegistrationEvent';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as bootstrap from "bootstrap";
import {Location} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-get-event',
  templateUrl: './get-event.component.html',
  styleUrls: ['./get-event.component.css']
})
export class GetEventComponentF implements OnInit {
  events: Event[] = [];
  newEvent: Event = new Event();
  newEventForm: FormGroup;
  warningMessage: string = '';
  @ViewChild('warningSuccessModal') warningSuccessModal!: ElementRef;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ElementRef;
  private eventIdToDelete!: number;
  @ViewChild('updateEventModal') updateEventModal!: ElementRef;
  selectedEvent?: Event;
  updateEventForm: FormGroup;
  event_id!: number;
  event!: Event;
  totalItems = 0;
  currentPage = 0;
  pageSize = 10; // Adjust based on your needs


  constructor(
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,

  ) {
    this.newEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', Validators.required],
      place: ['', Validators.required],
      event_description: ['', Validators.required]
    });
    this.updateEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', Validators.required],
      place: [''],
      event_description: [''],
    });


    }

  ngOnInit(): void {
    this.loadEvents(this.currentPage, this.pageSize);
    this.event_id = parseInt(<string>this.route.snapshot.paramMap.get('id'));

  }
  showModalWithMessage(message: string): void {
    this.warningMessage = message;
    const modalInstance = new bootstrap.Modal(this.warningSuccessModal.nativeElement);
    modalInstance.show();
  }
  showUpdateModal(event: Event): void {
    this.selectedEvent = event;
    this.updateEventForm.patchValue({
      event_name: event.event_name,
      event_date: event.event_date,
      place: event.place,
      event_description: event.event_description,
    });
    const modal = new bootstrap.Modal(this.updateEventModal.nativeElement);
    modal.show();
  }
  loadEvents(pageIndex: number, pageSize: number): void {
    this.eventService.findAllEvent(pageIndex, pageSize).subscribe({
      next: (response) => {
        this.events = response.content; // Adjust according to your API response structure
        this.totalItems = response.totalElements;
        this.currentPage = pageIndex;
        this.pageSize = pageSize;
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.showModalWithMessage('Error loading events. Please try again.');
      }
    });
  }

  changePage(event: PageEvent): void {
    this.loadEvents(event.pageIndex, event.pageSize);
  }


  nextPage(): void {
    if (this.currentPage < (this.totalItems / this.pageSize) - 1) {
      this.currentPage++;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }
  loadEvent(): void {
    this.eventService.findOneEvent(this.event_id).subscribe(
      (event: Event) => {
        this.event = event;
        this.updateEventForm.patchValue({
          event_name: this.event.event_name,
          event_description: this.event.event_description,
          place: this.event.place,
          event_date: this.event.event_date,
        });
      },
      error => {
        console.error('Error loading event:', error);
      }
    );
  }
  updateEvent(event_id: number): void {
    console.log('Updating event with ID:', event_id);
    this.router.navigate([`/EventF/UpdateEvent/${event_id}`]);
  }
  deleteEvent(event_id: number): void {
    console.log('Deleting event with ID:', event_id);
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event_id).subscribe(
        () => {
          console.log('Event deleted successfully.');
          alert('Event deleted successfully.');
          this.loadEvents(this.currentPage, this.pageSize);
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  addEvent(): void {
    if (this.newEventForm.valid) {
      const newEvent: Event = this.newEventForm.value;
      this.eventService.addEvent(newEvent).subscribe(
        () => {
          this.showModalWithMessage('Event is add successfully!');

          console.log('Event added successfully.');
          this.newEventForm.reset();
          this.loadEvents(this.currentPage, this.pageSize);
          this.cdr.detectChanges();

        },
        error => {
          this.showModalWithMessage('Error adding event:');
        }
      );
    }
  }
  askDeleteConfirmation(activityId: number): void {
    this.eventIdToDelete = activityId;
    const modal = new bootstrap.Modal(this.deleteConfirmationModal.nativeElement);
    modal.show();
  }
  confirmDeletion(): void {
    this.eventService.hasRelatedActivities(this.eventIdToDelete).subscribe(canDelete => {
      if (canDelete) {
        this.showModalWithMessage('Event cannot be deleted because it has related activities.');
      } else {
        this.eventService.deleteEvent(this.eventIdToDelete).subscribe(() => {
          this.showModalWithMessage('Event deleted successfully!');
          this.loadEvents(this.currentPage, this.pageSize); // Refresh the events list
        }, error => {
          this.showModalWithMessage('Error deleting the event. Please try again.');
        });
      }
    });

    const modalInstance = bootstrap.Modal.getInstance(this.deleteConfirmationModal.nativeElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  checkAndDeleteEvent(event_id: number): void {
    this.eventService.hasRelatedActivities(event_id).subscribe((hasRelated: boolean) => {
      if (hasRelated) {
        this.showModalWithMessage('This event has related activities and cannot be deleted.');
      } else {
        this.askDeleteConfirmation(event_id);
      }
    }, (error: any) => {
      console.error('Error checking for related activities:', error);
    });
  }
  loadRelatedData(event: Event): void {
    this.eventService.getRelatedUsers(event.event_id).subscribe(
      (users: User[]) => {
        if (users && users.length > 0) {
          event.users = users;
        }
      },
      (error: any) => {
        console.error('Error loading related users:', error);
      }
    );

    this.eventService.getRelatedActivities(event.event_id).subscribe(
      (activities: Activity[]) => {
        event.Activitys = activities;
      },
      (error: any) => {
        console.error('Error loading related activities:', error);
      }
    );

    this.eventService.getRelatedRegistrations(event.event_id).subscribe(
      (registrations: RegistrationEvent[]) => {
        event.RegistationEvents = registrations;
      },
      (error: any) => {
        console.error('Error loading related registrations:', error);
      }
    );
  }
  onUpdateEvent(): void {
    if (this.updateEventForm.valid && this.selectedEvent) {
      const updatedEvent = {
        ...this.selectedEvent, // Ensure you have the event ID and any other non-updated fields
        ...this.updateEventForm.value,
      };

      this.eventService.updateEvent(updatedEvent.event_id, updatedEvent).subscribe({
        next: () => {
          this.showModalWithMessage('Event updated successfully!');
          this.loadEvents(this.currentPage, this.pageSize); // Reload your events list to reflect the update
          // Close the modal
        },
        error: (error) => {
          console.error('Error updating event:', error);
          this.showModalWithMessage('Error updating event.');
        }
      });
    }
  }





}
