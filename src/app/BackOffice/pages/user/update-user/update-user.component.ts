import {Component, OnInit} from '@angular/core';
import {User} from "../../../../Models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../Services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  userForm: FormGroup;
  user: User = new User();


  genderOptions = [
    { value: '1', label: 'Female' },
    { value: '0', label: 'Male' }
  ];

  constructor(private formbulder: FormBuilder, private userService: UserService,private router: Router,private route: ActivatedRoute) {
    this.userForm = this.formbulder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      adresse: ['', Validators.required],
      birthdate:['', Validators.required],
      phonenumber:['', [Validators.required]],
      gender: ['', Validators.required],
    })
  }

  updateuser() {
    if (this.userForm.valid) {
      const updateduser: User = this.userForm.value;
      updateduser.userId = this.user.userId;
      this.userService.updateUser(updateduser).subscribe(
        () => {
          console.log('User updated successfully.');
          alert('User updated successfully.');
          this.router.navigate(['/admin/findall']);
        },
        error => {
          console.error('Error updating job offer:', error);
        }
      );
    }
  }



  ngOnInit() {
    // Retrieve the user ID from the route parameters
   this.route.paramMap.subscribe(params =>{
     const userid= +params.get('id')!;
     this.loadUser(userid);
   })
  }
  loadUser(userid: number) {
    console.log('User ID from route parameters:', userid);

    this.userService.getUserById(userid).subscribe(
      (user: User) => {
        console.log('User loaded successfully:', user);

        this.user = user;
        this.userForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          adresse: user.adresse,
          birthdate : user.birthdate,
          phonenumber : user.phonenumber,
          gender: user.gender,
        });
      },
      error => {
        console.error('Error loading user:', error);
      }
    );
  }


}
