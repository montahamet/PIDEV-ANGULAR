import { Component } from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-get-event',
  templateUrl: './get-event.component.html',
  styleUrls: ['./get-event.component.css']
})
export class GetEventComponent {
event: Event[]=[];
}
