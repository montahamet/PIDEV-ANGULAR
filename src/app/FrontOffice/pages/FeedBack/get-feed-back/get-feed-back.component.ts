import { Component } from '@angular/core';
import {FeedBack} from "src/app/Models/FeedBack";
import {FeedBackService} from "src/app/Services/FeedBack.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-get-feed-back',
  templateUrl: './get-feed-back.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./get-feed-back.component.css']
})
export class GetFeedBackComponent {
  feedbacks: FeedBack[]=[];
  constructor(

              private feedBackService: FeedBackService
  ){}
  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(): void {
    this.feedBackService.findAllFeedBacks().subscribe(
      FeedBack =>this.feedbacks=FeedBack
    );
  }

}

