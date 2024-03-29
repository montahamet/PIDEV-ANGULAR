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
  searchQuery = '';

  constructor(private activityServiceB : ActivityService) {
  }
  loadActivitiesBack(): void {
    this.activityServiceB.findAllActivities(this.currentPage, this.pageSize).subscribe(
      data => {
        // Suppose que la réponse est un objet avec une propriété `content` contenant le tableau d'activités
        this.activities = data.content;
      },
      error => console.error('Error fetching activities:', error)
    );
  }
  get filteredActivities() {
    return this.activities.filter(activity =>
        activity.activity_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
    ngOnInit() : void {
    this.loadActivitiesBack();
      console.log(this.activities);
    }
}
