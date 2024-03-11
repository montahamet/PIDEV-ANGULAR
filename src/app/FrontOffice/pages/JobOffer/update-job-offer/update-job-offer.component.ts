// update-job-offer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-job-offer',
  templateUrl: './update-job-offer.component.html',
  styleUrls: ['./update-job-offer.component.css']
})
export class UpdateJobOfferComponent implements OnInit {
  jobOfferForm: FormGroup;
  jobOffer: JobOffer = new JobOffer();

  constructor(
    private formBuilder: FormBuilder,
    private jobOfferService: JobOfferService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.jobOfferForm = this.formBuilder.group({
      titleJobOffer: ['', Validators.required],
      description: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      experience: ['', Validators.required],
      jobLocation: ['', Validators.required],
      applicationDeadLine: ['', Validators.required],
      vacancy: [Validators.required, Validators.min(1)],
      minsalary: [Validators.required, Validators.min(1)],
      maxsalary: [Validators.required, Validators.min(1)],
      jobNature: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const jobId = +params.get('id')!;
      this.loadJobOffer(jobId);
    });
  }

  loadJobOffer(jobId: number) {
    this.jobOfferService.getJobOfferById(jobId).subscribe(
      (jobOffer: JobOffer) => {
        this.jobOffer = jobOffer;
        this.jobOfferForm.patchValue({
          titleJobOffer: jobOffer.titleJobOffer,
          description: jobOffer.description,
          requiredSkills: jobOffer.requiredSkills,
          experience: jobOffer.experience,
          jobLocation: jobOffer.jobLocation,
          applicationDeadLine: jobOffer.applicationDeadLine,
          vacancy: jobOffer.vacancy,
          minsalary: jobOffer.minsalary,
          maxsalary: jobOffer.maxsalary,
          jobNature: jobOffer.jobNature
        });
      },
      error => {
        console.error('Error loading job offer:', error);

      }
    );
  }

  updateJobOffer() {
    if (this.jobOfferForm.valid) {
      const updatedJobOffer: JobOffer = this.jobOfferForm.value;
      updatedJobOffer.jobOffer_id = this.jobOffer.jobOffer_id;
      this.jobOfferService.updateJobOffer(updatedJobOffer).subscribe(
        () => {
          console.log('Job offer updated successfully.');
          alert('Job offer updated successfully.');
          this.router.navigate(['/job-offers']);
        },
        error => {
          console.error('Error updating job offer:', error);
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }
}
