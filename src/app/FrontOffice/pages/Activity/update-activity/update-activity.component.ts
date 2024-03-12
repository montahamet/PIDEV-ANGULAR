import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/Models/Activity';
import { Event } from 'src/app/Models/Event';

import { ActivityService } from 'src/app/Services/Activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponentF implements OnInit {
  activityForm: FormGroup;
  activity: Activity = new Activity();
  events: Event[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activityForm = this.formBuilder.group({
      activity_name: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      finishTime: ['', Validators.required],
      event_id: ['', Validators.required]},
      { validators: this.dateRangeValidator });

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const activityId = +params.get('id')!;
      this.loadActivity(activityId);
      this.loadEvents();
    });
    this.activityService.getAllEventsWithName().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  loadActivity(activity_id: number) {
    this.activityService.findOneActivity(activity_id).subscribe(
      (activity: Activity) => {
        this.activity = activity;
        this.activityForm.patchValue({
          activity_name: activity.activity_name,
          description: activity.description,
          startTime: activity.startTime,
          finishTime: activity.finishTime,
          event_id: activity.event_id

        });
      },
      error => {
        console.error('Error loading activity:', error);
      }
    );
  }

  loadEvents() {
    this.activityService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  updateActivity() {
    if (this.activityForm.valid) {
      const updatedActivity: Activity = this.activityForm.value;
      updatedActivity.activity_id = this.activity.activity_id;
      this.activityService.updateActivity(updatedActivity).subscribe(
        () => {
          console.log('Activity updated successfully.');
          alert('Activity updated successfully.');
          this.router.navigate(['/ActivityF/allactivitiesF']);

        },
        error => {
          console.error('Error updating activity:', error);
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }

  dateRangeValidator(formGroup: FormGroup) {
    const startTime = new Date(formGroup.get('startTime')!.value).getTime();
    const finishTime = new Date(formGroup.get('finishTime')!.value).getTime();

    return startTime < finishTime ? null : { dateRange: true };
  }
}
