import { Component } from '@angular/core';
import {Activity} from "../../../../Models/Activity";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
  activity: Activity = new Activity();
}
