import { Component } from '@angular/core';
import {Activity} from "../../../../Models/Activity";
import {ActivityService} from "../../../../Services/Activity.service";

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent {
  activity: Activity = new Activity(); // Initialisez un nouvel objet Activity pour stocker les données de l'activité à mettre à jour


}
