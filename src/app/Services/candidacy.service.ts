import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidacy } from '../Models/candidacy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  urlCandidacy: string = "http://localhost:8082/PiDev/Candidacy";

findAllCandidacies(): Observable<Candidacy[]> {
  return this.myHttp.get<Candidacy[]>(this.urlCandidacy + '/findAllCandidacies');
}

  constructor(private myHttp:HttpClient) { }
}
