import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-job-offer',
  templateUrl: './add-job-offer.component.html',
  styleUrls: ['./add-job-offer.component.css']
})
export class AddJobOfferComponent {
  jobOfferForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobOfferService: JobOfferService,private location: Location) {
    this.jobOfferForm = this.formBuilder.group({
      titleJobOffer: ['', Validators.required],
      description: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      vacancy:  [Validators.required, Validators.min(1)],
      salary: [Validators.required, Validators.min(1)],
      jobNature: [0, Validators.required], 
    });
  }

  onSubmit() {
    if (this.jobOfferForm.valid) {
      const jobOffer: JobOffer = this.jobOfferForm.value;
      jobOffer.postedDate = new Date(); 
      this.jobOfferService.addJobOffer(jobOffer).subscribe(
        (addedJobOffer: JobOffer) => {
          console.log('Job offer added successfully:', addedJobOffer);
          alert('Job offer added successfully!');
        },
        error => {
          console.error('Error adding job offer:', error);
        }
      );
    }
  }
  cancel() {
    this.location.back(); 
  }
}
