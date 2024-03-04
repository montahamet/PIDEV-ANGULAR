import { Component } from '@angular/core';
import {FeedBack} from "../../../../Models/FeedBack";

@Component({
  selector: 'app-update-feed-back',
  templateUrl: './update-feed-back.component.html',
  standalone: true,
  styleUrls: ['./update-feed-back.component.css']
})
export class UpdateFeedBackComponent {
  feedBack: FeedBack = new FeedBack();

}
