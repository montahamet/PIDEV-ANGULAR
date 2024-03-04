import {Component, Injectable} from '@angular/core';
import { UserService } from './Services/user.service';
import {EventService} from "./Services/Event.service";
import {ActivityService} from "./Services/Activity.service";
import{FeedBackService} from "./Services/FeedBack.service";
import{TrainingSessionService} from "./Services/TrainingSession.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({ providedIn: 'root' })
export class AppComponent {
  title = 'PiDevAngular';

}



