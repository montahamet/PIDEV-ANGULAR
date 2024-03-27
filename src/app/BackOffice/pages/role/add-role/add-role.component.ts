import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../Services/role.service";
import {Role} from "../../../../Models/role";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  roleForm : FormGroup ;
  submitted = false;

  constructor(private  formbulder:FormBuilder,private roleService: RoleService) {
    this.roleForm = this.formbulder.group({
      roleName: ['', [Validators.required,Validators.min(2)]],

    });

  }




  ngOnInit(): void {

  }
  addRole() {
    this.submitted = true;
    if (this.roleForm.valid) {
      const newrole: Role = this.roleForm.value as Role;
      this.roleService.addRole(newrole).subscribe(
        response => {
          // Handle success, if needed
          console.log('Role added successfully:', response);
          this.roleForm.reset();

        },
        error => {
          // Handle error
          console.error('Error adding Role:', error);
        }
      );}
  }

}
