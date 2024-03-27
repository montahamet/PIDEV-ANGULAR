import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Role} from "../../../../Models/role";
import {RoleService} from "../../../../Services/role.service";

@Component({
  selector: 'app-find-all-role',
  templateUrl: './find-all-role.component.html',
  styleUrls: ['./find-all-role.component.css']
})
export class FindAllRoleComponent {
  roles : Role[] = [];

  constructor(private roleService: RoleService,private router: Router ){}
  ngOnInit(){
    this.loadRoles();
  }
  loadRoles(){
    this.roleService.findAllRoles().subscribe(roles=>this.roles=roles);

  }
  editRole(roleId: number) {
    // Navigate to the Edit User route with the user ID as a parameter
    this.router.navigate(['/admin/updaterole', roleId]);
  }

  delete(roleId: number) {
    if (confirm('Are you sure you want to delete this Role?')) {
      this.roleService.deleteRole(roleId).subscribe(
        () => {
          console.log('Role deleted successfully.');
          alert('Role deleted successfully.');
          this.loadRoles();
        },
        error => {
          console.error('Error deleting User:', error);
        }
      );
    }
  }

}

