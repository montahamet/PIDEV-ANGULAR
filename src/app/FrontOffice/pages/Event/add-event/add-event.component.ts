  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Event } from 'src/app/Models/Event';
  import { User } from 'src/app/Models/User';
  import { EventService } from 'src/app/Services/Event.service';
  import { Location } from '@angular/common';

  import {Router} from "@angular/router";

  @Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
  })
  export class AddEventComponentF {
    eventForm: FormGroup;
    users: User[] = [];

    constructor(private formBuilder: FormBuilder, private eventService: EventService,     private router: Router,
                private location: Location ) {
      this.eventForm = this.formBuilder.group({
        event_name: ['', Validators.required],
        event_date: ['', Validators.required],
        users: [[]],
        registration_events: [[]],
        activities: [[]],
        feedbacks: [[]]
      });
    }

    onSubmit() {
      if (this.eventForm.valid) {
        const event: Event = this.eventForm.value;

        this.eventService.addEvent(event).subscribe(
          (addedEvent: Event) => {
            console.log('Event added successfully:', addedEvent);
            alert('Event added successfully!');
            this.router.navigate(['/Event/AddEvenF']);
          },
          error => {
            console.error('Error adding event:', error);
          }
        );
      }
    }

    goBack() {
      this.location.back();
    }
  }
