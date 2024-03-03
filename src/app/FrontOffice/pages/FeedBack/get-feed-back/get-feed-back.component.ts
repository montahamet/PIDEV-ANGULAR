import { Component } from '@angular/core';
import {FeedBack} from "../../../../Models/FeedBack";
import {FeedBackService} from "../../../../Services/FeedBack.service";

@Component({
  selector: 'app-get-feed-back',
  templateUrl: './get-feed-back.component.html',
  standalone: true,
  styleUrls: ['./get-feed-back.component.css']
})
export class GetFeedBackComponent {
  feedbacks: FeedBack[]=[];
  constructor(

              private feedBackService: FeedBackService,
  ){}
  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(): void {
    this.feedBackService.findAllFeedBacks().subscribe(
      (feedbacks) => {
        console.log('Feedbacks loaded successfully:', feedbacks);
        this.feedbacks = feedbacks;
      },
      (error) => {
        console.log('Error loading feedbacks:', error);
      }
    );
  }
}

