import { Component } from '@angular/core';
import { Interview } from 'src/app/Models/interview';
import { InterviewService } from 'src/app/Services/interview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-all-interviews',
  templateUrl: './find-all-interviews.component.html',
  styleUrls: ['./find-all-interviews.component.css']
})
export class FindAllInterviewsComponent {
  interviews: Interview[] = [];

  constructor(private interviewService: InterviewService, private router: Router) {
  }

  loadInterviews() {
    this.interviewService.findAllInterviews().subscribe(interviews => this.interviews = interviews);
  }

  ngOnInit() {
    this.loadInterviews();
  }

  updateInterview(interviewId: number) {
    this.router.navigate(['/Interview/updateInterview', interviewId]);
  }
  deleteInterview(interviewId: number) {
    if (confirm('Are you sure you want to delete this interview?')) {
      this.interviewService.deleteInterview(interviewId).subscribe(
        () => {
          console.log('Interview deleted successfully.');
          alert('Interview deleted successfully.');
          this.loadInterviews();
        },
        error => {
          console.error('Error deleting interview:', error);
        }
      );
    }
  }
  navigateToAddInterview() {
    this.router.navigate(['/Interview/addInterviewfront']);
  }
}