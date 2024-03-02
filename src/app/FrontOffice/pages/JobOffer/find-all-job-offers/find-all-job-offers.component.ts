import { Component } from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-all-job-offers',
  templateUrl: './find-all-job-offers.component.html',
  styleUrls: ['./find-all-job-offers.component.css']
})
export class FindAllJobOffersComponent {
  jobOffers: JobOffer[] = [];

  constructor(private js: JobOfferService, private router: Router) {}

  loadJobOffers() {
    this.js.findAllJobOffers().subscribe(jobOffers => (this.jobOffers = jobOffers));
  }

  ngOnInit() {
    this.loadJobOffers();
  }

  updateJobOffer(jobId: number) {
    this.router.navigate(['/JobOffer/updateJobOffer', jobId]);
  }
  deleteJobOffer(jobId: number) {
    if (confirm('Are you sure you want to delete this job offer?')) {
      this.js.deleteJobOffer(jobId).subscribe(
        () => {
          console.log('Job offer deleted successfully.');
          alert('Job offer deleted successfully.');
          this.loadJobOffers();
        },
        error => {
          console.error('Error deleting job offer:', error);
        }
      );
    }
  }
  navigateToAddJobOffer() {
    this.router.navigate(['/JobOffer/addJobOffersfront']);
  }
}
