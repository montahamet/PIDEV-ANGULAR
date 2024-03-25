import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';

import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';
import {FindAllUsersComponent} from "./BackOffice/pages/user/find-all-users/find-all-users.component";
import {RegisterComponent} from "./BackOffice/pages/user/register/register.component";
import {UpdateUserComponent} from "./BackOffice/pages/user/update-user/update-user.component";
import {UserDetailComponent} from "./BackOffice/pages/user/user-detail/user-detail.component";
import {FindAllRoleComponent} from "./BackOffice/pages/role/find-all-role/find-all-role.component";
import {AddRoleComponent} from "./BackOffice/pages/role/add-role/add-role.component";
import {UpdateRoleComponent} from "./BackOffice/pages/role/update-role/update-role.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {

    path: "home",
    component: AllTemplateFrontComponent
  },
  {
    path: "admin",
    component: AllTemplatBackComponent,
    children:[
      {path:"findall", component:FindAllUsersComponent},
      {path:"updateuser/:id", component:UpdateUserComponent},
      {path:"userdetails/:id", component:UserDetailComponent},
      {path:"findallrole", component:FindAllRoleComponent},
      {path:"addrole", component:AddRoleComponent},
      {path:"updaterole/:id", component:UpdateRoleComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
