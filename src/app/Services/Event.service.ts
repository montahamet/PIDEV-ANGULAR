import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Event } from "../Models/Event";
import {User} from "../user";
import {RegistrationEvent} from "../Models/RegistrationEvent";
import {Activity} from "../Models/Activity";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private EventUrl: string = 'http://localhost:8082/PiDev/Event-TrainingSession';

  constructor(private http: HttpClient) { }

  findAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.EventUrl}/findAllEvents`);
  }

  findOneEvent(): Observable<Event> {
    return this.http.get<Event>(`${this.EventUrl}/findOneEvent`);
  }

  UpdateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.EventUrl}/UpdateEvent`, event);
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.EventUrl}/addEvent`, event);
  }

  deleteEvent(event_id: number): Observable<void> {
    return this.http.delete<void>(`${this.EventUrl}/deleteEvent/${event_id}`);
  }
  getRelatedUsers(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.EventUrl}/getRelatedUsers/${eventId}`);
  }
  getRelatedRegistrations(eventId: number): Observable<RegistrationEvent[]> {
    return this.http.get<RegistrationEvent[]>(`${this.EventUrl}/getRelatedRegistrations/${eventId}`);
  }
  getRelatedActivities(eventId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.EventUrl}//getRelatedActivities/${eventId}`);
  }
}
