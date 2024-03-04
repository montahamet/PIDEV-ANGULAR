import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/Models/Activity';
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
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const activityId = +params.get('id')!;
      this.loadActivity(activityId);
    });
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
        });
      },
      error => {
        console.error('Error loading activity:', error);
      }
    );
  }

  updateActivity() {
    if (this.activityForm.valid) {
      const updatedActivity: Activity = this.activityForm.value;
      updatedActivity.activity_id = this.activity.activity_id;
      this.activityService.UpdateActivity(updatedActivity).subscribe(
        () => {
          console.log('Activity updated successfully.');
          alert('Activity updated successfully.');
          this.router.navigate(['/activities']);
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
}
