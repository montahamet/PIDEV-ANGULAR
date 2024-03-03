import { Component } from '@angular/core';
import {FeedBack} from "../../../../Models/FeedBack";

@Component({
  selector: 'app-get-feed-back',
  templateUrl: './get-feed-back.component.html',
  styleUrls: ['./get-feed-back.component.css']
})
export class GetFeedBackComponent {
feedBack: FeedBack[]=[];
}

