import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Activity } from "../Models/Activity";
import { Injectable } from "@angular/core";
import {Event} from "../Models/Event";

@Injectable({
  providedIn: 'root'
})
//http://localhost:8082/PiDev/Activity-TrainingSession/findAllActivities
export class ActivityService {
  private ActivityUrl: string = 'http://localhost:8082/PiDev/Activity-TrainingSession/';

  constructor(private http: HttpClient) {
  }

  findAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.ActivityUrl + 'findAllActivities');
  }

//http://localhost:8082/PiDev/Activity-TrainingSession/findOneActivity?Activity_id=2
  findOneActivity(activity_id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.ActivityUrl}findOneActivity?Activity_id=${activity_id}`);
  }


  updateActivity(activity: Activity): Observable<void> {
    const updateUrl = `${this.ActivityUrl}UpdateActivity`;
    return this.http.put<void>(updateUrl, activity);
  }
//http://localhost:8082/PiDev/Activity-TrainingSession/addActivity
  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.ActivityUrl + 'addActivity', activity);
  }

  deleteActivity(activity_id: number): Observable<void> {
    return this.http.delete<void>(`${this.ActivityUrl}deleteActivityById?activity_id=${activity_id}`);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.ActivityUrl + 'getAllEvents');
  }
  getAllEventsWithName(): Observable<Event[]> {
    return this.http.get<Event[]>(this.ActivityUrl + 'getAllEventsWithName');
  }
}
