import { Component } from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';
import { JobOfferService } from 'src/app/Services/job-offer.service';

@Component({
  selector: 'app-find-all-job-offers',
  templateUrl: './find-all-job-offers.component.html',
  styleUrls: ['./find-all-job-offers.component.css']
})
export class FindAllJobOffersComponent {
  jobOffers: JobOffer[] = [];
  constructor(private js:JobOfferService){
  }

  loadJobOffers(){
    this.js.findAllJobOffers().subscribe(jobOffers=>this.jobOffers=jobOffers); 
  }
  ngOnInit(){
    this.loadJobOffers();
  }

}
