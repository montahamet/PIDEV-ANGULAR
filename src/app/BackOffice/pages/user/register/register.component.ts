import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm : FormGroup ;
  gender : string[] = ['MALE','FEMALE'];
  constructor(private  formbulder:FormBuilder,private userService: UserService) {
    this.userForm = this.formbulder.group({
      firstName:['',Validators.required],
      email:['',Validators.required],
    lastname:['',Validators.required],
    password:['',Validators.required],
    Adresse:['',Validators.required],
    gender:['',Validators.required],
    })
  }
  genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' }
  ];
  addUser() {
    if (this.userForm.valid) {
      const newuser: User = this.userForm.value as User;
      this.userService.addUser(newuser).subscribe();
    }
  }

  ngOnInit(): void {
  }

}
