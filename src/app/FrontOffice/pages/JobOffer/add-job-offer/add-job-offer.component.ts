import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';

@Component({
  selector: 'app-add-job-offer',
  templateUrl: './add-job-offer.component.html',
  styleUrls: ['./add-job-offer.component.css']
})
export class AddJobOfferComponent {
  jobOfferForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobOfferService: JobOfferService) {
    this.jobOfferForm = this.formBuilder.group({
      titleJobOffer: ['', Validators.required],
      description: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      vacancy:  [Validators.required, Validators.min(1)],
      salary: [Validators.required, Validators.min(1)],
      jobNature: [0, Validators.required], // assuming 0 represents FULL_TIME in the enum
    });
  }

  onSubmit() {
    if (this.jobOfferForm.valid) {
      const jobOffer: JobOffer = this.jobOfferForm.value;
      jobOffer.postedDate = new Date(); // assuming you want to set the posted date to the current date
      this.jobOfferService.addJobOffer(jobOffer).subscribe(
        (addedJobOffer: JobOffer) => {
          console.log('Job offer added successfully:', addedJobOffer);
          alert('Job offer added successfully!');
          // You can add additional logic or navigate to another page upon successful submission
        },
        error => {
          console.error('Error adding job offer:', error);
          // Handle error accordingly
        }
      );
    }
  }
  cancel() {
    this.router.navigate(['/PiDev/JobOffer/findAllJobOffers']);
  }
}
