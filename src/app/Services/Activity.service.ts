import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Activity } from "../Models/Activity";
import { Injectable } from "@angular/core";
import { Event } from "../Models/Event";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private ActivityUrl: string = 'http://localhost:8082/PiDev/Activity-TrainingSession/';

  constructor(private http: HttpClient) { }

  findAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.ActivityUrl + 'findAllActivities').pipe(
      catchError(this.handleError)
    );
  }

  findOneActivity(activity_id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.ActivityUrl}findOneActivity?Activity_id=${activity_id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateActivity(activity: Activity): Observable<void> {
    const updateUrl = `${this.ActivityUrl}UpdateActivity`;
    return this.http.put<void>(updateUrl, activity).pipe(
      catchError(this.handleError)
    );
  }

  addActivity(activity: Activity): Observable<Activity> {
    console.log('Adding activity:', activity);
    return this.http.post<Activity>(this.ActivityUrl + 'addActivity', activity).pipe(
      catchError(this.handleError)
    );
  }

  deleteActivity(activity_id: number): Observable<void> {
    return this.http.delete<void>(`${this.ActivityUrl}deleteActivityById?activity_id=${activity_id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.ActivityUrl + 'getAllEvents').pipe(
      catchError(this.handleError)
    );
  }

  getAllEventsWithName(): Observable<Event[]> {
    return this.http.get<Event[]>(this.ActivityUrl + 'getAllEventsWithName').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('An error occurred:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retourne une observable avec un message d'erreur convivial
    return throwError(
      'Something bad happened; please try again later.');
  }
}
