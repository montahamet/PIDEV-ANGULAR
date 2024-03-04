import { Component } from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  // @ts-ignore
  event: Event = new Event();

}
