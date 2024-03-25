import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Event } from '../../../../Models/Event';
import { EventService } from '../../../../Services/Event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  event_id!: number;
  event!: Event;
  eventForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  )
  {this.eventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_description: [''],
      place: [''],
      event_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.event_id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.loadEvent();
  }

  loadEvent(): void {
    this.eventService.findOneEvent(this.event_id).subscribe(
      (event: Event) => {
        this.event = event;
        this.eventForm.patchValue({
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

  onSubmit(): void {
    if (this.eventForm.valid) {
      const updatedEvent: Event = this.eventForm.value;
      updatedEvent.event_id = this.event_id;

      this.eventService.updateEvent(updatedEvent.event_id, updatedEvent).subscribe (
      () => {
          console.log('Event updated successfully.');
          alert('Event updated successfully!');
          this.router.navigate(['/Event/allEventF']);
        },
        error => {
          console.error('Error updating event:', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
