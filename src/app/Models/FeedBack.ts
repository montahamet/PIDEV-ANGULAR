import {User} from "./User";
import {Event} from "./Event";
import {TrainingSession} from "./TrainingSession";

export class FeedBack {
  event_id!: number ;
  Event_name!: string;
  Event_date!: Date;
  user!:User;
  event!: Event;
  trainingsession!: TrainingSession;
}
