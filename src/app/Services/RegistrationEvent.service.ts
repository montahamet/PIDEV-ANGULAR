import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {RegistrationEvent} from "../Models/RegistrationEvent";

@Injectable({
  providedIn: 'root'
})
export class RegistrationEventService {
  private RegistrationEventUrl: string = 'http://localhost:8082/PiDev/RegistrationEvent-TrainingSession/';

  constructor(private http: HttpClient) { }

  findAllRegistrationEvent(): Observable<RegistrationEvent[]> {
    return this.http.get<RegistrationEvent[]>(this.RegistrationEventUrl + 'findAllRegistrationEvent');
  }

  findOneRegistrationEvent(registrationE_id:number): Observable<RegistrationEvent> {
    return this.http.get<RegistrationEvent>(this.RegistrationEventUrl + '/findOneRegistrationEvent/${registrationE_id}');
  }

  addRegistrationEvent(registrationEvent: RegistrationEvent): Observable<RegistrationEvent> {
    return this.http.post<RegistrationEvent>(this.RegistrationEventUrl + 'addRegistrationEvent', registrationEvent);
  }
  UpdateRegistrationEvent(registrationEvent: RegistrationEvent): Observable<RegistrationEvent> {
    return this.http.put<RegistrationEvent>(this.RegistrationEventUrl + 'UpdateRegistrationEvent', registrationEvent);
  }
  deleteRegistrationEvent(registrationE_id:number): Observable<void>{
    return this.http.delete<void>('${this.RegistrationEventUrl}/deleteRegistrationEvent/${registrationE_id}');
  }
}
