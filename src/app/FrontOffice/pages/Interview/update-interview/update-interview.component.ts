// update-interview.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Interview } from 'src/app/Models/interview';
import { InterviewService } from 'src/app/Services/interview.service';
import { Location } from '@angular/common';

// Import the enums
import { TypeInterview } from 'src/app/Models/type-interview'; // Update the path accordingly
import { StatusInterview } from 'src/app/Models/status-interview';

@Component({
  selector: 'app-update-interview',
  templateUrl: './update-interview.component.html',
  styleUrls: ['./update-interview.component.css']
})
export class UpdateInterviewComponent implements OnInit {
  interviewForm: FormGroup;
  interview: Interview = new Interview();
  // Bind enums to the component
  typeInterview = TypeInterview;
  statusInterview = StatusInterview;

  constructor(
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.interviewForm = this.formBuilder.group({
      dateInterview: ['', Validators.required],
      type: [TypeInterview.HR, Validators.required], // Set a default value from the enum
      statusInterview: [StatusInterview.SCHEDULED, Validators.required], // Set a default value from the enum
      passed: [false, Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const interviewId = +params.get('id')!;
      this.loadInterview(interviewId);
    });
  }

  loadInterview(id: number) {
    this.interviewService.getInterview(id).subscribe(
      (interview: Interview) => {
        this.interview = interview;
        this.interviewForm.patchValue({
          dateInterview: interview.dateInterview,
          type: interview.type,
          statusInterview: interview.statusInterview,
          passed: interview.passed
        });
      },
      error => {
        console.error('Error loading interview:', error);
      }
    );
  }

  updateInterview() {
    if (this.interviewForm.valid) {
      const updatedInterview: Interview = this.interviewForm.value;
      updatedInterview.interview_id = this.interview.interview_id;
      this.interviewService.updateInterview(updatedInterview).subscribe(
        () => {
          console.log('Interview updated successfully.');
          alert('Interview updated successfully.');
          this.router.navigate(['/interviews']);
        },
        error => {
          console.error('Error updating interview:', error);
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
