import { Component } from '@angular/core';
import {Activity} from "../../../../Models/Activity";

@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.css']
})
export class GetActivityComponent {
  activities: Activity[] = [];
}
