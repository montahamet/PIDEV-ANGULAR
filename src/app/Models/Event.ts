import {User} from "./User";
import {RegistrationEvent} from "./RegistrationEvent";
import {Activity} from "./Activity";
import {FeedBack} from "./FeedBack";

export class Event{
  event_id!: number;
  Event_name!: string;
  Event_date!: Date;
  user!:User;
  RegistationEvents!:RegistrationEvent[];
  Activitys!: Activity[];
  FeedBacks!: FeedBack[];

}
