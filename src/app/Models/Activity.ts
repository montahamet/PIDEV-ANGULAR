import {Event} from "./Event";

export class Activity{
  Activity_id! : number ;
  Activity_name! : string;
  description! : string;
  startTime!: Date;
  finishTime!: Date;
  event!:Event;

}
