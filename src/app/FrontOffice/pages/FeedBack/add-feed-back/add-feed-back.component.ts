import { Component } from '@angular/core';
import {Event} from "@angular/router";
import {FeedBack} from "../../../../Models/FeedBack";

@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css']
})
export class AddFeedBackComponent {
feedBack: FeedBack = new FeedBack();
}

