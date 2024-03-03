import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Activity } from "../Models/Activity";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private ActivityUrl: string = 'http://localhost:8082/PiDev/Activity-TrainingSession/';

  constructor(private http: HttpClient) { }

  findAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.ActivityUrl + 'findAllActivities');
  }

  findOneActivity(): Observable<Activity> {
    return this.http.get<Activity>(this.ActivityUrl + 'findOneActivity');
  }

  UpdateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(this.ActivityUrl + 'UpdateActivity', activity);
  }
  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.ActivityUrl + 'addActivity', activity);
  }
  deleteActivity(Activity_id: number): Observable<void> {
    return this.http.delete<void>(`${this.ActivityUrl}/deleteActivity/${Activity_id}`);
  }
}
