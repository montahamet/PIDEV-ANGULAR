import { Component } from '@angular/core';
import {Event} from "../../../../Models/Event";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  event: Event = new Event();
}
