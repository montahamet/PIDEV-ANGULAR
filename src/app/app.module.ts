import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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


import  { FormsModule, ReactiveFormsModule } from '@angular/forms' ;
import { FindAllUsersComponent } from './BackOffice/pages/user/find-all-users/find-all-users.component';
import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';
import { UpdateJobOfferComponent } from './FrontOffice/pages/JobOffer/update-job-offer/update-job-offer.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AddInterviewComponent } from './BackOffice/pages/Interview/add-interview/add-interview.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';

import { AddEventComponent } from './BackOffice/pages/Event/add-event/add-event.component';
import { UpdateEventComponent } from './BackOffice/pages/Event/update-event/update-event.component';
import { GetEventComponent } from './BackOffice/pages/Event/get-event/get-event.component';
import { AddFeedBackComponent } from './BackOffice/pages/FeedBack/add-feed-back/add-feed-back.component';
import { UpdateFeedBackComponent } from './BackOffice/pages/FeedBack/update-feed-back/update-feed-back.component';
import { GetFeedBackComponent } from './BackOffice/pages/FeedBack/get-feed-back/get-feed-back.component';
import { AddActivityComponent } from './BackOffice/pages/Activity/add-activity/add-activity.component';
import { UpdateActivityComponent } from './BackOffice/pages/Activity/update-activity/update-activity.component';
import { GetActivityComponent } from './BackOffice/pages/Activity/get-activity/get-activity.component';
import { AppComponent } from './app.component';


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
    FindAllJobOffersComponent,
    FindAllCandidaciesComponent,
    FindAllInterviewsComponent,
    AddJobOfferComponent,
    UpdateJobOfferComponent,
    HomeFrontComponent,
    AddInterviewComponent,
    UpdateInterviewComponent,
    
    AddEventComponent,
    GetEventComponent,
    UpdateEventComponent,
    AddFeedBackComponent,
    GetFeedBackComponent,
    UpdateFeedBackComponent,
    AddActivityComponent,
    GetActivityComponent,
    UpdateActivityComponent,
    AddEventComponent,
    UpdateEventComponent,
    GetEventComponent,
    AddFeedBackComponent,
    UpdateFeedBackComponent,
    GetFeedBackComponent,
    AddActivityComponent,
    UpdateActivityComponent,
    GetActivityComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
