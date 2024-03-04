import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import {UserService} from "../../../../Services/user.service";

@Component({
  selector: 'app-find-all-users',
  templateUrl: './find-all-users.component.html',
  styleUrls: ['./find-all-users.component.css']
})
export class FindAllUsersComponent {
  users : User[] = [];
  constructor(private userService: UserService ){}
  ngOnInit(){
    this.loadUsers();
  }
  loadUsers(){
    this.userService.findAllUsers().subscribe(users=>this.users=users);

  }

}
