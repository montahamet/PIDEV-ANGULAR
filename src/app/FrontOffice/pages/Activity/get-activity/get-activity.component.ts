import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/Models/Activity';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.css'],
})
export class GetActivityComponentFront implements OnInit {
  activities: Activity[] = [];

  constructor(private activityServiceF: ActivityService, private router: Router) {}

  loadActivitiesFront(): void {
    this.activityServiceF.findAllActivities().subscribe(
      activities => {
        this.activities = activities;
        console.log('Activities:', this.activities);
      }
    );
  }


  ngOnInit(): void {
    this.loadActivitiesFront();
    console.log('Activities:', this.activities);
  }

  updateActivity(activity_id: number): void {
    this.router.navigate([`/ActivityF/updateactivityF/${activity_id}`]);
  }

  deleteActivity(activity_id : number): void {
    console.log('Activity ID:', activity_id );
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activityServiceF.deleteActivity(activity_id ).subscribe(
        () => {
          console.log('Activity deleted successfully.');
          alert('Activity deleted successfully.');
          this.loadActivitiesFront();
        },
        error => {
          console.error('Error deleting activity:', error);
        }
      );
    }
  }

  navigateToAddActivity(): void {
    this.router.navigate(['/Activity/AddActivityF']);
  }
}
