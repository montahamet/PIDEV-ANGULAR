import { Component } from '@angular/core';
import {Activity} from "../../../../Models/Activity";
import {ActivityService} from "../../../../Services/Activity.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  standalone: true,
  imports: [
    DatePipe
  ],
  styleUrls: ['./get-activity.component.css']
})
export class GetActivityComponent  {
  activities: Activity[] = [];
  constructor(              private activityService: ActivityService,
  ){}
  ngOnInit(): void {
    this.loadActivities();
  }
  loadActivities(): void {
    this.activityService.findAllActivities().subscribe(
      (activities) => {
        console.log('Activities loaded successfully:', activities);
        this.activities = activities;
      },
      (error) => {
        console.log('Error loading activities:', error);
      }
    );
  }

}
