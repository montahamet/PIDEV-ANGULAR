import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Event } from "../Models/Event";
import {RegistrationEvent} from "../Models/RegistrationEvent";
import {Activity} from "../Models/Activity";
import {User} from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private EventUrl: string = 'http://localhost:8082/PiDev/Event-TrainingSession';

  constructor(private http: HttpClient) { }

  findAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.EventUrl}/findAllEvents`);
  }
  hasRelatedActivities(eventId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.EventUrl}/${eventId}/hasRelatedActivities`);
  }
  findOneEvent(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.EventUrl}/findOneEvent/${eventId}`);
  }


  UpdateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.EventUrl}/UpdateEvent`, event);
  }

  addEvent(event: Event): Observable<Event> {
    console.log('Event to be added:', event);
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
    return this.http.get<Activity[]>(`${this.EventUrl}/getRelatedActivities/${eventId}`);
  }

}
