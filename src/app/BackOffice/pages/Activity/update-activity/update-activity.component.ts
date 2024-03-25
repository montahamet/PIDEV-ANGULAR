import { Component } from '@angular/core';
import {Activity} from "../../../../Models/Activity";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent {
  activity: Activity = new Activity();
}
