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
  totalActivities = 0;
  currentPage = 0;
  pageSize = 10;
  constructor(private activityServiceB : ActivityService) {
  }
  loadActivititesBack():void{
    this.activityServiceB.findAllActivities(this.currentPage, this.pageSize).subscribe(
      activities => this.activities = activities
    );
  }
  ngOnInit() : void {
    this.loadActivititesBack();
}
}
