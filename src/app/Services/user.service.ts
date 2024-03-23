import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl : string = 'http://localhost:8082/PiDev/user';

  constructor(private http: HttpClient) { }
  findAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + '/retrieveAllUser');
  }
}
