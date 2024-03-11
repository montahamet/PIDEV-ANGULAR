import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Activity } from "../Models/Activity";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
//http://localhost:8082/PiDev/Activity-TrainingSession/findAllActivities
export class ActivityService {
  private ActivityUrl: string = 'http://localhost:8082/PiDev/Activity-TrainingSession/';

  constructor(private http: HttpClient) { }

  findAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.ActivityUrl + 'findAllActivities');
  }

  findOneActivity(activityId: number): Observable<Activity> {
    return this.http.get<Activity>(this.ActivityUrl + 'findOneActivity?activity_id=${activityId}');
  }

  UpdateActivity(activity: Activity): Observable<void> {
    const updateUrl = `${this.ActivityUrl}UpdateActivity/${activity.activity_id}`;
    return this.http.put<void>(updateUrl, activity);
  }
  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.ActivityUrl + 'addActivity', activity);
  }
  deleteActivity(activityId: number) {
    return this.http.delete(this.ActivityUrl +`/deleteActivity?activity_id=${activityId}`);
  }
}
