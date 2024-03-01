import { Component } from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';

@Component({
  selector: 'app-find-all-job-offers',
  templateUrl: './find-all-job-offers.component.html',
  styleUrls: ['./find-all-job-offers.component.css']
})
export class FindAllJobOffersComponent {
  jobOffers: JobOffer[] = [];

}
