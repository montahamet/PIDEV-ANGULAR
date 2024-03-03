import {Component, Injectable} from '@angular/core';
import { UserService } from './Services/user.service';
import {EventService} from "./Services/Event.service";
import {ActivityService} from "./Services/Activity.service";
import{FeedBackService} from "./Services/FeedBack.service";
import{TrainingSessionService} from "./Services/TrainingSession.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
@Injectable({ providedIn: 'root' })
export class AppComponent {
  title = 'PiDevAngular';

  constructor(private userService: UserService,
              private eventService: EventService,
              private activityService : ActivityService,
              private feedBackService:FeedBackService,
              private trainingSessionService:TrainingSessionService
  ){}
}



