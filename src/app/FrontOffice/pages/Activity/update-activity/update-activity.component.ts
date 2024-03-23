import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/Models/Activity';
import { Event } from 'src/app/Models/Event';
import { ActivityService } from 'src/app/Services/Activity.service';
import { Location } from '@angular/common';
import { formatDate } from '@angular/common';


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
      event: [null, Validators.required] // Ici, nous utilisons seulement l'ID de l'événement, donc pas besoin de modifier
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const activityId = +params.get('id')!;
      this.loadActivity(activityId);
      this.loadEvents();
    });
  }

  loadActivity(activityId: number) {
    this.activityService.findOneActivity(activityId).subscribe(
      (activity: Activity) => {
        this.activity = activity;
        // Convertissez les chaînes en objets Date
        const startTime = new Date(activity.startTime);
        const finishTime = new Date(activity.finishTime);

        // Mise à jour du formulaire avec les valeurs de l'activité chargée
        this.activityForm.patchValue({
          activity_name: activity.activity_name,
          description: activity.description,
          // Utilisez les objets Date convertis pour appeler toISOString()
          startTime: startTime.toISOString().slice(0, 16),
          finishTime: finishTime.toISOString().slice(0, 16),
          event: activity.event?.event_id // Assurez-vous que cette valeur correspond à ce que votre backend attend
        });
      },
      error => {
        console.error('Error loading activity:', error);
      }
    );
  }


  loadEvents() {
    this.activityService.getAllEventsWithName().subscribe(
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
      const updatedActivity = new Activity();
      const formValues = this.activityForm.value;
      updatedActivity.activity_id = this.activity.activity_id;
      updatedActivity.activity_name = formValues.activity_name;
      updatedActivity.description = formValues.description;
      updatedActivity.startTime = new Date(formValues.startTime);
      updatedActivity.finishTime = new Date(formValues.finishTime);
      // Créez un objet Event avec seulement l'ID pour l'association
      updatedActivity.event = { event_id: formValues.event } as Event;

      this.activityService.updateActivity(updatedActivity, formValues.event).subscribe(
        () => {
          alert('Activity updated successfully.');
          this.router.navigate(['/ActivityF/allactivitiesF']);
        },
        error => {
          console.error('Error updating activity:', error);
          alert('Error updating activity.');
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
