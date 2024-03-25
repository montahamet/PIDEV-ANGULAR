
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userForm : FormGroup ;
  submitted = false;
  genderOptions = [
    { value: '1', label: 'Female' },
    { value: '0', label: 'Male' }
  ];
  constructor(private  formbulder:FormBuilder,private router: Router,private userService: UserService) {
    this.userForm = this.formbulder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      adresse: ['', Validators.required],
      birthdate:['', Validators.required],
      phonenumber:['', [Validators.required,this.positiveNumberValidator()]],
      gender: ['', Validators.required],
    });

  }




  ngOnInit(): void {

      }
  addUser() {
    this.submitted = true;
    if (this.userForm.valid) {
      const newuser: User = this.userForm.value as User;
      this.userService.addUser(newuser).subscribe(
        response => {
          // Handle success, if needed
          console.log('User added successfully:', response);
          this.router.navigate(['/admin/findall']);
          this.userForm.reset();

        },
        error => {
          // Handle error
          console.error('Error adding user:', error);
        }
      );}
  }
    positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (Validators.required(control) !== null || isNaN(value) || value < 0) {
        return { 'positiveNumber': { value } };
      }
      return null;
    };
  }

}
