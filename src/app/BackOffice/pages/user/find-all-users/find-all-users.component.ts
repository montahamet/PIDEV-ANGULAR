import { Component } from '@angular/core';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-find-all-users',
  templateUrl: './find-all-users.component.html',
  styleUrls: ['./find-all-users.component.css']
})
export class FindAllUsersComponent {
  users : User[] = [];

}
