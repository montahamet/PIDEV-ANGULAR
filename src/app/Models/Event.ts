import {User} from "./User";
import {RegistrationEvent} from "./RegistrationEvent";
import {Activity} from "./Activity";
import {FeedBack} from "./FeedBack";

export class Event{
  event_id!: number;
  event_name!: string;
  event_date!: Date;
  users!: User [];
  RegistationEvents!:RegistrationEvent[];
  Activitys!: Activity[];
  FeedBacks!: FeedBack[];

}
