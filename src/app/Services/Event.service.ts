import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {Event} from "../Models/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private EventUrl: string = 'http://localhost:8082/PiDev';

  constructor(private http: HttpClient) { }

  findAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.EventUrl + '/Event-TrainingSession/findAllEvent');
  }

  findOneEvent(): Observable<Event> {
    return this.http.get<Event>(this.EventUrl + '/Event-TrainingSession/findOneEvent');
  }

  UpdateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(this.EventUrl + '/Event-TrainingSession/UpdateEvent', event);
  }
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.EventUrl + '/Event-TrainingSession/addEvent', event);
  }
  deleteEvent(event_id:number): Observable<void>{
    return this.http.delete<void>('${this.EventUrl}/deleteEvent/${event_id}');
  }
}
