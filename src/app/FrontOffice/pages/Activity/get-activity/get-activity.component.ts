import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from 'src/app/Models/Activity';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/Models/Event';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.css'],
})
export class GetActivityComponentFront implements OnInit {
  activities: Activity[] = [];
  events: Event[] = [];
  totalActivities = 0;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private activityServiceF: ActivityService, private router: Router) {}

  loadActivitiesFront(pageIndex: number, pageSize: number): void {
    this.activityServiceF.findAllActivities(pageIndex, pageSize).subscribe(response => {
      this.activities = response.content;
      this.totalActivities = response.totalElements;
      this.totalPages = Math.ceil(this.totalActivities / this.pageSize);
    }, error => {
      console.error('Error fetching activities:', error);
    });
  }
  nextPage(): void {
    if (this.currentPage < (this.totalActivities / this.pageSize) - 1) {
      this.currentPage++;
      this.loadActivitiesFront(this.currentPage, this.pageSize);
    }
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadActivitiesFront(this.currentPage, this.pageSize);
    }
  }
  loadEvents(): void {
    this.activityServiceF.getAllEvents().subscribe(
      events => {
        this.events = events;
        console.log('Events:', this.events);
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadActivitiesFront(this.currentPage, this.pageSize);
    this.loadEvents();
    // this.changePage({ pageIndex: this.currentPage, pageSize: this.pageSize });

  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadActivitiesFront(this.currentPage, this.pageSize);
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
          this.loadActivitiesFront(this.currentPage, this.pageSize);
        },
        error => {
          console.error('Error deleting activity:', error);
        }
      );
    }
  }

  navigateToAddActivity(): void {
    this.router.navigate(['/ActivityF/AddActivityF']);
  }

  getEventName(activity: Activity): string {
    return activity.event ? activity.event.event_name : 'No Event';
  }



}
