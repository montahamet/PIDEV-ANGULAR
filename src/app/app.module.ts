import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';

import { LoginComponent } from './BackOffice/pages/user/login/login.component';
import { RegisterComponent } from './BackOffice/pages/user/register/register.component';
import { AddProjectComponent } from './BackOffice/pages/project/add-project/add-project.component';
import {  HttpClientModule } from '@angular/common/http';
import { FindAllUsersComponent } from './BackOffice/pages/user/find-all-users/find-all-users.component' ;
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent} from "./BackOffice/pages/user/update-user/update-user.component";
import {UserService} from "./Services/user.service";
import { UserDetailComponent} from "./BackOffice/pages/user/user-detail/user-detail.component";
import { FindAllRoleComponent} from "./BackOffice/pages/role/find-all-role/find-all-role.component";
import { UpdateRoleComponent} from "./BackOffice/pages/role/update-role/update-role.component";
import { AddRoleComponent} from "./BackOffice/pages/role/add-role/add-role.component";

@NgModule({
  declarations: [
    AppComponent,
    AllTemplatBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,

    LoginComponent,
    RegisterComponent,
    AddProjectComponent,
    FindAllUsersComponent,
    UpdateUserComponent,
    UserDetailComponent,
    FindAllRoleComponent,
    UpdateRoleComponent,
    AddRoleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule



  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
