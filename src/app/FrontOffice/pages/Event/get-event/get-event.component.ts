import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/Event';
import { EventService } from 'src/app/Services/Event.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { Activity } from 'src/app/Models/Activity';
import { RegistrationEvent } from 'src/app/Models/RegistrationEvent';

@Component({
  selector: 'app-get-event',
  templateUrl: './get-event.component.html',
  styleUrls: ['./get-event.component.css']
})
export class GetEventComponentF implements OnInit {
  events: Event[] = [];
  newEvent: Event = new Event();

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.findAllEvent().subscribe(
      events => {
        this.events = events;
        console.log('Events:', this.events);
      },
      error => {
        console.error('Error loading events:', error);
      }
    );
  }

  updateEvent(event_id: number): void {
    this.router.navigate([`/Event/updateeventF/${event_id}`]);
  }

  deleteEvent(event_id: number): void {
    console.log('Event ID:', event_id);
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
    this.eventService.addEvent(this.newEvent).subscribe(
      () => {
        console.log('Event added successfully.');
        alert('Event added successfully.');
        this.newEvent = new Event(); // Réinitialiser le modèle pour le nouvel événement
        this.loadEvents();
      },
      error => {
        console.error('Error adding event:', error);
      }
    );
  }

  loadRelatedData(event: Event): void {
    this.eventService.getRelatedUsers(event.event_id).subscribe(
      (users: User[]) => {
        if (users && users.length > 0) {
          event.users = users[0];
        }
      },
      (error: any) => {
        console.error('Error loading related users:', error);
      }
    );

    // Chargez les activités liées à l'événement
    this.eventService.getRelatedActivities(event.event_id).subscribe(
      (activities: Activity[]) => {
        event.Activitys = activities; // Assurez-vous que 'activities' est correctement nommé dans votre modèle Event
      },
      (error: any) => {
        console.error('Error loading related activities:', error);
      }
    );

    // Chargez les inscriptions liées à l'événement
    this.eventService.getRelatedRegistrations(event.event_id).subscribe(
      (registrations: RegistrationEvent[]) => {
        event.RegistationEvents = registrations; // Assurez-vous que 'registrations' est correctement nommé dans votre modèle Event
      },
      (error: any) => {
        console.error('Error loading related registrations:', error);
      }
    );
  }

  navigateToAddEvent(): void {
    this.router.navigate(['/Event/AddEventF']);
  }
}
