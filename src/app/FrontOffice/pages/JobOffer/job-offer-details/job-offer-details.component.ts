import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';


@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  standalone: true,
  styleUrls: ['./job-offer-details.component.css']
})
export class JobOfferDetailsComponent implements OnInit {
  jobId: number = 0;
jobOffer: JobOffer = {} as JobOffer;

  constructor(
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = +params['id'];
      console.log('Job ID:', this.jobId);
      this.loadJobOfferDetails();
    });
  }


  loadJobOfferDetails(): void {
    // Fetch the job offer details using the service
    this.jobOfferService.getJobOfferById(this.jobId).subscribe(
      (result) => {
        this.jobOffer = result;
      },
      (error) => {
        console.error('Error loading job offer details', error);
      }
    );
  }
}
