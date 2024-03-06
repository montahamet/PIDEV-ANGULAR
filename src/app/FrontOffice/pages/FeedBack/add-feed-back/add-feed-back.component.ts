import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from '../../../../Models/FeedBack';

@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css']
})
export class AddFeedBackComponentF {
  feedbackForm!: FormGroup;
  feedback: FeedBack = new FeedBack();

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.feedbackForm = this.formBuilder.group({
      description: ['', Validators.required],
      note: ['', Validators.required],
      user: ['', Validators.required],
      event: ['', Validators.required],
      trainingsession: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
    } else {
      Object.values(this.feedbackForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
