import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, NgZone} from '@angular/core';
import { JobOffer } from 'src/app/Models/job-offer';
import { WishlistComponent } from 'src/app/FrontOffice/pages/JobOffer/wishlist/wishlist.component';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-find-all-job-offers',
  templateUrl: './find-all-job-offers.component.html',
  styleUrls: ['./find-all-job-offers.component.css']
})
export class FindAllJobOffersComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  jobOffer: JobOffer = new JobOffer();
  currentPage: number = 1; // Current page
  itemsPerPage: number = 4; // Items per page
  wishlist: JobOffer[] = [];
  jobOfferForm: FormGroup;
  private jobOfferIdToUpdate!: number;
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('warningSuccessModal') warningSuccessModal!: ElementRef;
  warningMessage: string = '';
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef; // Add ViewChild for the update modal
  @ViewChild('updateConfirmationModal') updateConfirmationModal!: ElementRef;
  private jobOfferIdToDelete!: number;
  constructor(private js: JobOfferService, private router: Router,private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef,
              private ngZone: NgZone,private route: ActivatedRoute) {
    this.jobOfferForm = this.formBuilder.group({
      titleJobOffer: ['', Validators.required],
      description: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      experience: ['', Validators.required],
      jobLocation: ['', Validators.required],
      applicationDeadLine: ['', Validators.required],
      vacancy:  [Validators.required, Validators.min(1)],
      minsalary: [Validators.required, Validators.min(1)],
      maxsalary: [Validators.required, Validators.min(1)],
      jobNature: [0, Validators.required],
    });
  }

  loadJobOffers() {
    this.js.findAllJobOffers().subscribe(jobOffers => (this.jobOffers = jobOffers));
  }
  // Method to handle job offer form submission
  onJobOfferSubmit() {
    if (this.jobOfferForm.valid) {
      const jobOffer: JobOffer = this.jobOfferForm.value;

      // Call the job offer service to add the job offer
      this.js.addJobOffer(jobOffer).subscribe(
        (addedJobOffer: JobOffer) => {
          console.log('Job offer added successfully:', addedJobOffer);
          // Show success message
          this.showModalWithMessage('Job offer added successfully!');
          // Reset the form
          this.jobOfferForm.reset();
          // Reload job offers
          this.loadJobOffers();
        },
        error => {
          console.error('Error adding job offer:', error);
          // Show error message
          this.showModalWithMessage('Error adding job offer. Please try again.');
        }
      );
    }
  }

  showModalWithMessage(message: string): void {
    this.warningMessage = message;
    const modalInstance = new bootstrap.Modal(this.warningSuccessModal.nativeElement);
    modalInstance.show();
  }

  ngOnInit() {
    this.loadJobOffers();
    this.loadWishlist();
    this.route.params.subscribe(params => {
      const jobId = params['jobOfferId'];
      if (jobId) {
        this.fetchJobOfferById(jobId);
      }
    });
  }
  updateJobOffer(jobOfferId: number) {
    // Open the update modal with the specific job offer ID
    const modalInstance = new bootstrap.Modal(this.updateModal.nativeElement);
    modalInstance.show();

    // Fetch the job offer data by ID
    this.fetchJobOfferById(jobOfferId);
  }
  fetchJobOfferById(jobOfferId: number) {
    // Call your job offer service to fetch the data by ID
    this.js.getJobOfferById(jobOfferId).subscribe(
      (jobOffer: JobOffer) => {
        // Populate the form fields with fetched job offer data
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
          jobNature: jobOffer.jobNature,
        });
      },
      error => {
        console.error('Error fetching job offer:', error);
        // Handle error accordingly
      }
    );
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

  updateJobOffer2(jobOfferId: number) {
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
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.jobOffers.slice(startIndex, startIndex + this.itemsPerPage);
  }
  getTotalPages(): number {
    return Math.ceil(this.jobOffers.length / this.itemsPerPage);
  }
  getPaginationNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
  askDeleteConfirmation(jobOfferId: number): void {
    this.jobOfferIdToDelete = jobOfferId;
    const modal = new bootstrap.Modal(this.deleteConfirmationModal.nativeElement);
    modal.show();
  }

  confirmDeletion(): void {
    this.js.deleteJobOffer(this.jobOfferIdToDelete).subscribe({
      next: () => {
        this.showModalWithMessage('Job offer deleted successfully!');
        this.loadJobOffers(); // Refresh the job offers list
      },
      error: () => {
        this.showModalWithMessage('Error deleting the job offer. Please try again.');
      }
    });

    // Correct way to hide the modal
    const modalInstance = bootstrap.Modal.getInstance(this.deleteConfirmationModal.nativeElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
// Add a method to show the update confirmation modal
  askUpdateConfirmation(jobOfferId: number): void {
    // Store the job offer ID to update
    this.jobOfferIdToUpdate = jobOfferId;

    // Show the update confirmation modal
    const modal = new bootstrap.Modal(this.updateConfirmationModal.nativeElement);
    modal.show();
  }

// Implement the logic to handle the user's response when confirming the update
  confirmUpdate(): void {
    // Construct an object containing the job offer ID and the updated data
    const updatedJobOfferData = {
      id: this.jobOfferIdToUpdate,
      data: this.jobOfferForm.value
    };

    // Call the job offer service to update the job offer
    this.js.updateJobOffer2(updatedJobOfferData).subscribe(
      (response: any) => {
        // Show success message
        this.showModalWithMessage('Job offer updated successfully!');
        // Refresh the job offers list
        this.loadJobOffers();
      },
      (error: any) => {
        // Show error message
        this.showModalWithMessage('Error updating the job offer. Please try again.');
      }
    );

    // Hide the update confirmation modal
    const modalInstance = bootstrap.Modal.getInstance(this.updateConfirmationModal.nativeElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

}
