import { Component } from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
// @ts-ignore
  event: Event = new Event();
}
