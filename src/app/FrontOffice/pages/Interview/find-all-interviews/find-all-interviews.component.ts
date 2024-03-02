import { Component } from '@angular/core';
import { Interview } from 'src/app/Models/interview';
import { InterviewService } from 'src/app/Services/interview.service';

@Component({
  selector: 'app-find-all-interviews',
  templateUrl: './find-all-interviews.component.html',
  styleUrls: ['./find-all-interviews.component.css']
})
export class FindAllInterviewsComponent {
  interviews: Interview[] = [];
  constructor(private i:InterviewService){
  }

  loadInterviews(){
    this.i.findAllInterviews().subscribe(interviews=>this.interviews=interviews); 
  }
  ngOnInit(){
    this.loadInterviews();
  }

}
