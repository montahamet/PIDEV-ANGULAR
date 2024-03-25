import { Component } from '@angular/core';
import {User} from "../../../../Models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../Services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  userId: number = 0;
  user: User = {} as User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      console.log('User Id:', this.userId);
      this.loadJobOfferDetails();
    });
  }


  loadJobOfferDetails(): void {
    // Fetch the job offer details using the service
    this.userService.getUserById(this.userId).subscribe(
      (result) => {
        this.user = result;
      },
      (error) => {
        console.error('Error loading job offer details', error);
      }
    );
  }

}
