import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  ngOnInit() {
    // Retrieve wishlist from local storage on component initialization
    this.loadWishlist();
  }

  saveWishlist() {
    // Save wishlist to local storage
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  loadWishlist() {
    // Load wishlist from local storage
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  addToWishlist(jobOffer: any) {
    // Add job offer to the wishlist
    this.wishlist.push(jobOffer);
    // Save the updated wishlist to local storage
    this.saveWishlist();
  }

  removeFromWishlist(jobOffer: any) {
    // Remove job offer from the wishlist
    this.wishlist = this.wishlist.filter(item => item !== jobOffer);
    // Save the updated wishlist to local storage
    this.saveWishlist();
  }

  clearWishlist() {
    // Clear the entire wishlist
    this.wishlist = [];
    // Save the updated wishlist to local storage
    this.saveWishlist();
  }
}
