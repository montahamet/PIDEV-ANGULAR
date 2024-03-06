import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interview } from 'src/app/Models/interview';
import { StatusInterview } from 'src/app/Models/status-interview';
import { TypeInterview } from 'src/app/Models/type-interview';
import { InterviewService } from 'src/app/Services/interview.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent {
  interviewForm: FormGroup;
  statusInterviewOptions = Object.values(StatusInterview).filter(value => typeof value === 'number');
  typeInterviewOptions = Object.values(TypeInterview).filter(value => typeof value === 'number');

  constructor(private formBuilder: FormBuilder, private interviewService: InterviewService, private location: Location) {
    this.interviewForm = this.formBuilder.group({
      dateInterview: ['', Validators.required],
      type: ['', Validators.required],
      statusInterview: ['', Validators.required],
      passed: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.interviewForm.valid) {
      const interview = this.interviewForm.value;
      this.interviewService.addInterview(interview).subscribe(
        (addedInterview) => {
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
