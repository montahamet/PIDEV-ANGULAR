import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interview } from '../Models/interview';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  urlIntrview : string = "http://localhost:8082/PiDev/Interview";


  constructor(private myHttp:HttpClient) { }
  findAllInterviews():Observable<Interview[]>{
    return this.myHttp.get<Interview[]>(this.urlIntrview + '/findAllInterviews');  }
}
