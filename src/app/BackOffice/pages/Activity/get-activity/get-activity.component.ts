import {Component, OnInit} from '@angular/core';
import {Activity} from "../../../../Models/Activity";
import {ActivityService} from "../../../../Services/Activity.service";

@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.css']
})
export class GetActivityComponentBack implements OnInit{
  activities: Activity[] = [];
  constructor(private activityServiceB : ActivityService) {
  }
  loadActivititesBack():void{
    this.activityServiceB.findAllActivities().subscribe(
      activities => this.activities = activities
    );
  }
  ngOnInit() : void {
    this.loadActivititesBack();
}
}
