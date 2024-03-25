import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FeedBack } from "../Models/FeedBack";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  private FeedBackUrl: string = 'http://localhost:8082/PiDev/FeedBack-TrainingSession/';

  constructor(private http: HttpClient) { }

  findAllFeedBacks(): Observable<FeedBack[]> {
    return this.http.get<FeedBack[]>(this.FeedBackUrl + 'findAllFeedBacks').pipe(
      tap((feedbacks: FeedBack[]) => { // Spécifiez le type pour feedbacks
        console.log('Feedbacks:', feedbacks);
        feedbacks.forEach((feedback: FeedBack) => { // Spécifiez le type pour feedback
          console.log('FeedBack_date:', feedback.FeedBack_date);
        });
      })
    );
  }

  findOneFeedBack(feedback_id: number): Observable<FeedBack> {
    return this.http.get<FeedBack>(`${this.FeedBackUrl}/findOneFeedBack/${feedback_id}`); // Utilisez les backticks (`) pour l'interpolation des chaînes
  }

  UpdateFeedBack(feedBack: FeedBack): Observable<FeedBack> {
    return this.http.put<FeedBack>(this.FeedBackUrl + 'UpdateFeedBack', feedBack);
  }

  addFeedBack(feedBack: FeedBack): Observable<FeedBack> {
    return this.http.post<FeedBack>(this.FeedBackUrl + 'addFeedBack', feedBack);
  }

  deleteFeedBack(feedback_id: number): Observable<void> {
    return this.http.delete<void>(`${this.FeedBackUrl}/deleteFeedBack/${feedback_id}`); // Utilisez les backticks (`) pour l'interpolation des chaînes
  }
}
