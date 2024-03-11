import { Component } from '@angular/core';
import {Event} from "../../../../Models/Event";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  standalone: true,
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {

  event: Event = new Event();

}
