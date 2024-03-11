import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidacy } from '../Models/candidacy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  urlCandidacy: string = "http://localhost:8082/PiDev/candidacy";

findAllCandidacies(): Observable<Candidacy[]> {
  return this.myHttp.get<Candidacy[]>(this.urlCandidacy + '/findAllCandidacies');
}
addInterview(candidacy: Candidacy): Observable<Candidacy> {
  return this.myHttp.post<Candidacy>(this.urlCandidacy + '/addCandidacy', candidacy);
}

  constructor(private myHttp:HttpClient) { }
}
