import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';
import { WishlistComponent } from 'src/app/FrontOffice/pages/JobOffer/wishlist/wishlist.component';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-all-job-offers',
  templateUrl: './find-all-job-offers.component.html',
  styleUrls: ['./find-all-job-offers.component.css']
})
export class FindAllJobOffersComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  wishlist: JobOffer[] = [];

  constructor(private js: JobOfferService, private router: Router) {}

  loadJobOffers() {
    this.js.findAllJobOffers().subscribe(jobOffers => (this.jobOffers = jobOffers));
  }

  ngOnInit() {
    this.loadJobOffers();
    this.loadWishlist();
  }

  addToWishlist(jobOffer: JobOffer) {
    if (!this.isInWishlist(jobOffer)) {
      this.wishlist.push(jobOffer);
      this.saveWishlist();
    }
  }

  removeFromWishlist(jobOffer: JobOffer) {
    this.wishlist = this.wishlist.filter(item => item.jobOffer_id !== jobOffer.jobOffer_id);
    this.saveWishlist();
  }

  isInWishlist(jobOffer: JobOffer): boolean {
    return this.wishlist.some(item => item.jobOffer_id === jobOffer.jobOffer_id);
  }

  saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  loadWishlist() {
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  updateJobOffer(jobOfferId: number) {
    this.router.navigate(['/JobOffer/updateJobOffer', jobOfferId]);
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
  navigateToWishlist() {
    // Navigate to the WishlistComponent or any route you have for the wishlist
    this.router.navigate(['/JobOffer/wishlist']);
  }
}
