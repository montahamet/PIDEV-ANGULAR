import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interview } from 'src/app/Models/interview';
import { InterviewService } from 'src/app/Services/interview.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent {
  interviewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private interviewService: InterviewService,
    private location: Location
  ) {
    this.interviewForm = this.formBuilder.group({
      dateInterview: ['', Validators.required],
      type: [0, Validators.required],
      statusInterview: [0, Validators.required],
      passed: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.interviewForm.valid) {
      const interview: Interview = this.interviewForm.value;
      // Additional logic if needed
      this.interviewService.addInterview(interview).subscribe(
        (addedInterview: Interview) => {
          console.log('Interview added successfully:', addedInterview);
          alert('Interview added successfully!');
        },
        error => {
          console.error('Error adding interview:', error);
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
