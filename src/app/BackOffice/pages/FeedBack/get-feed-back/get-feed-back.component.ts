import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../../../Models/FeedBack';
import { FeedBackService } from '../../../../Services/FeedBack.service';

@Component({
  selector: 'app-get-feedback',
  templateUrl: './get-feed-back.component.html',
  styleUrls: ['./get-feed-back.component.css']
})
export class GetFeedbackComponent implements OnInit {
  feedbacks: FeedBack[] = [];

  constructor(private feedbackService: FeedBackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.findAllFeedBacks().subscribe(
      feedbacks => {
        this.feedbacks = feedbacks;
      },
      error => {
        console.error('Error loading feedbacks:', error);
      }
    );
  }
}
