import { Component } from '@angular/core';
import {Event} from "../../../../Models/Event";
import {EventService} from "../../../../Services/Event.service";

@Component({
  selector: 'app-get-event',
  templateUrl: './get-event.component.html',
  standalone: true,
  styleUrls: ['./get-event.component.css']
})
export class GetEventComponent {
events: Event[]=[];
  constructor(
              private eventService: EventService,

  ){}
  ngOnInit(): void {
    this.loadEvents();

  }
  loadEvents(): void {
    this.eventService.findAllEvent().subscribe(
      (events) => {
        console.log('Events loaded successfully:', events);
        this.events = events;
      },
      (error) => {
        console.log('Error loading events:', error);
      }
    );
  }
}
