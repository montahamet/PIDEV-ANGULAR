import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/Models/Activity';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponentFront {
  activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activityService: ActivityService, private location: Location) {
    this.activityForm = this.formBuilder.group({
      activity_name: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      finishTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.activityForm.valid) {
      const activity: Activity = this.activityForm.value;
      this.activityService.addActivity(activity).subscribe(
        (addedActivity: Activity) => {
          console.log('Activity added successfully:', addedActivity);
          alert('Activity added successfully!');
          this.goBack();
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
