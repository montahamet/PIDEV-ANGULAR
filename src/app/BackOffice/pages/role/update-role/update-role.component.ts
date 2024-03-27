import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../../../Models/role";
import {RoleService} from "../../../../Services/role.service";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit{
  roleForm: FormGroup;
  role: Role = new Role();




  constructor(private formbulder: FormBuilder, private roleService: RoleService,private router: Router,private route: ActivatedRoute) {
    this.roleForm = this.formbulder.group({
      roleName: ['', Validators.required],

    })
  }

  updaterole() {
    if (this.roleForm.valid) {
      const updatedrole: Role = this.roleForm.value;
      updatedrole.roleId = this.role.roleId;
      this.roleService.updateRole(updatedrole).subscribe(
        () => {
          console.log('Role updated successfully.');
          alert('Role updated successfully.');
          this.router.navigate(['/admin/findallrole']);
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
      const roleid= +params.get('id')!;
      this.loadRole(roleid);
    })
  }
  loadRole(roleid: number) {
    console.log('User ID from route parameters:', roleid);

    this.roleService.getRoleById(roleid).subscribe(
      (role: Role) => {
        console.log('Role loaded successfully:', role);

        this.role = role;
        this.roleForm.patchValue({
          firstname: role.roleName,

        });
      },
      error => {
        console.error('Error loading role:', error);
      }
    );
  }


}

