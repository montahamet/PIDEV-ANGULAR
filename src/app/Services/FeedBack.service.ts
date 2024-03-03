import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {FeedBack} from "../Models/FeedBack";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  private FeedBackUrl: string = 'http://localhost:8082/PiDev/FeedBack-TrainingSession/';

  constructor(private http: HttpClient) { }

  findAllFeedBacks(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(this.FeedBackUrl + 'findAllFeedBacks');
  }

  findOneFeedBack(feedback_id:number): Observable<FeedBack> {
    return this.http.get<FeedBack>(this.FeedBackUrl + '/findOneFeedBack/${feedback_id}');
  }

  UpdateFeedBack(feedBack: FeedBack): Observable<FeedBack> {
    return this.http.put<FeedBack>(this.FeedBackUrl + 'UpdateFeedBack', feedBack);
  }
  addFeedBack(feedBack: FeedBack): Observable<FeedBack> {
    return this.http.post<FeedBack>(this.FeedBackUrl + 'addFeedBack', feedBack);
  }
  deleteFeedBack(feedback_id:number): Observable<void>{
    return this.http.delete<void>('${this.FeedBackUrl}/deleteFeedBack/${feedback_id}');
  }
}
