import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Event } from 'src/app/Models/Event';
import { EventService } from 'src/app/Services/Event.service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/app/Models/User';
import { Activity } from 'src/app/Models/Activity';
import { RegistrationEvent } from 'src/app/Models/RegistrationEvent';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as bootstrap from "bootstrap";

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


  constructor(
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,

  ) {
    this.newEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', Validators.required],
      place: ['', Validators.required],
      event_description: ['', Validators.required]
    });
    {
      this.updateEventForm = this.formBuilder.group({
        event_name1: ['', Validators.required],
        event_date1: ['', Validators.required],
        place1: ['', Validators.required],
        event_description1: ['', Validators.required]
      });

    }}

  ngOnInit(): void {
    this.loadEvents();
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
      event_name1: event.event_name,
      event_date1: event.event_date,
      place1: event.place,
      event_description1: event.event_description
    });

    const modal = new bootstrap.Modal(this.updateEventModal.nativeElement);
    modal.show();
  }

  loadEvents(): void {
    this.eventService.findAllEvent().subscribe(
      events => {
        this.events = events;
        console.log('Events:', this.events);
        // Charger les données liées pour chaque événement
        this.events.forEach(event => this.loadRelatedData(event));
      },
      error => {
        console.error('Error loading events:', error);
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
          this.loadEvents();
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
          this.loadEvents();
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
          this.loadEvents(); // Refresh the events list
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
    // Assurez-vous que le formulaire est valide avant de procéder à la mise à jour
    if (this.updateEventForm.valid && this.selectedEvent) {
      // Créez un nouvel objet Event avec les valeurs mises à jour
      const updatedEvent: Event = {
        ...this.selectedEvent, // Utilisez l'opérateur spread pour copier les valeurs actuelles de selectedEvent
        ...this.updateEventForm.value, // Mettez à jour avec les nouvelles valeurs du formulaire
        event_id: this.selectedEvent.event_id, // Assurez-vous que l'ID de l'événement est correctement inclus
      };

      // Utilisez votre service pour envoyer la requête de mise à jour
      this.eventService.UpdateEvent(updatedEvent).subscribe({
        next: () => {
          // Affichez un message de succès
          this.showModalWithMessage('Event updated successfully!');
          // Rafraîchissez la liste des événements pour montrer les modifications
          this.loadEvents();
          // Fermez la modale de mise à jour
          const modalInstance = bootstrap.Modal.getInstance(this.updateEventModal.nativeElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        },
        error: (error) => {
          // En cas d'erreur, affichez un message et loguez l'erreur
          this.showModalWithMessage('Error updating event.');
          console.error('Error updating event:', error);
        }
      });
    }
  }

  navigateToAddEvent(): void {
    this.router.navigate(['/EventF/addEventF']);
  }
}
