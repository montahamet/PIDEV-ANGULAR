import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';

import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';
import {FindAllUsersComponent} from "./BackOffice/pages/user/find-all-users/find-all-users.component";
import {RegisterComponent} from "./BackOffice/pages/user/register/register.component";

const routes: Routes = [
  {
    path: "Register",
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
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
