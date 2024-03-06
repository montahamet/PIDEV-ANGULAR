import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/Models/Activity';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Location } from '@angular/common';
import { Event } from 'src/app/Models/Event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponentFront implements OnInit {
  activityForm: FormGroup;
  events: Event[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private location: Location,
    private router: Router)
  {
    this.activityForm = this.formBuilder.group({
      activity_name: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      finishTime: ['', Validators.required],
      event_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activityService.getAllEventsWithName().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onSubmit() {
    if (this.activityForm.valid) {
      const activity: Activity = this.activityForm.value;
      this.activityService.addActivity(activity).subscribe(
        (addedActivity: Activity) => {
          console.log('Activity added successfully:', addedActivity);
          alert('Activity added successfully!');
          this.router.navigate(['/ActivityF/allactivitiesF']);
          },

        error => {
          console.error('Error adding activity:', error);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
}
