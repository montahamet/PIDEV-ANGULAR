import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobOffer } from '../Models/job-offer';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  urlJobOffer : string = "http://localhost:8082/PiDev/JobOffer";


  constructor(private myHttp:HttpClient) { }
  findAllJobOffers():Observable<JobOffer[]>{
    return this.myHttp.get<JobOffer[]>(this.urlJobOffer + '/findAllJobOffers');  }
  addJobOffer(jobOffer:JobOffer):Observable<JobOffer>{
      return this.myHttp.post<JobOffer>(this.urlJobOffer+ '/addJobOffer',jobOffer);
    }
}
