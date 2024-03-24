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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {  HttpClientModule } from '@angular/common/http';
import { FindAllUsersComponent } from './BackOffice/pages/user/find-all-users/find-all-users.component';
import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';
import { AddInterviewComponent } from './FrontOffice/pages/Interview/add-interview/add-interview.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';
import { UpdateJobOfferComponent } from './FrontOffice/pages/JobOffer/update-job-offer/update-job-offer.component';
import { UpdateCandidacyComponent } from './FrontOffice/pages/Candidacy/update-candidacy/update-candidacy.component';
import { JobOfferDetailsComponent } from './BackOffice/pages/JobOffer/job-offer-details/job-offer-details.component';
import { AddProjectofferComponent } from './FrontOffice/pages/ProjectOffer/add-projectoffer/add-projectoffer.component';
import { AddQuoteComponent } from './FrontOffice/pages/Quote/add-quote/add-quote.component';
import { GetProjectofferComponent } from './FrontOffice/pages/ProjectOffer/get-projectoffer/get-projectoffer.component';
import { GetQuotesComponent } from './FrontOffice/pages/Quote/get-quotes/get-quotes.component';
import { UpdateProjectofferComponent } from './FrontOffice/pages/ProjectOffer/update-projectoffer/update-projectoffer.component';
import { UpdateQuoteComponent } from './FrontOffice/pages/Quote/update-quote/update-quote.component';
import { FilterPipe } from './FrontOffice/pages/ProjectOffer/app-filter.pipe';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WishlistComponent } from './FrontOffice/pages/JobOffer/wishlist/wishlist.component';
import { AddEventComponent } from './BackOffice/pages/Event/add-event/add-event.component';
import { AddFeedBackComponent } from './BackOffice/pages/FeedBack/add-feed-back/add-feed-back.component';
import { UpdateFeedBackComponent } from './BackOffice/pages/FeedBack/update-feed-back/update-feed-back.component';
import {GetFeedbackComponent} from './BackOffice/pages/FeedBack/get-feed-back/get-feed-back.component';
import {AppComponent} from "./app.component";

import {GetEventComponentF} from "./FrontOffice/pages/Event/get-event/get-event.component";
import {UpdateEventComponent} from './FrontOffice/pages/Event/update-event/update-event.component';
import { AddActivityComponent } from './BackOffice/pages/Activity/add-activity/add-activity.component';
import {GetActivityComponentBack} from './BackOffice/pages/Activity/get-activity/get-activity.component';
import { UpdateActivityComponent } from './BackOffice/pages/Activity/update-activity/update-activity.component';
import {GetActivityComponentFront} from './FrontOffice/pages/Activity/get-activity/get-activity.component';
import {AddActivityComponentFront} from "./FrontOffice/pages/Activity/add-activity/add-activity.component";
import {UpdateActivityComponentF} from "./FrontOffice/pages/Activity/update-activity/update-activity.component";
import {AddEventComponentF} from "./FrontOffice/pages/Event/add-event/add-event.component";
import {AddFeedBackComponentF} from  "./FrontOffice/pages/FeedBack/add-feed-back/add-feed-back.component"
import {CommonModule, DatePipe} from "@angular/common";



import { MatPaginatorModule } from '@angular/material/paginator';
import {HomeFrontComponent} from "./FrontOffice/home-front/home-front.component";




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

    HomeFrontComponent,
    AddInterviewComponent,
    UpdateInterviewComponent,
    FindAllJobOffersComponent,
    FindAllCandidaciesComponent,
    FindAllInterviewsComponent,
    AddInterviewComponent,
    UpdateInterviewComponent,
    AddJobOfferComponent,
    UpdateJobOfferComponent,


    AddProjectofferComponent,
    AddQuoteComponent,
    GetProjectofferComponent,
    GetQuotesComponent,
    UpdateProjectofferComponent,
    UpdateQuoteComponent,
    FilterPipe,
    WishlistComponent,


    AddEventComponent,
    UpdateEventComponent,
    AddFeedBackComponent,
    UpdateFeedBackComponent,
    AddActivityComponent,
    GetActivityComponentBack,
    UpdateActivityComponent,
    AppComponent,
    GetActivityComponentFront,
    AddActivityComponentFront,
    UpdateActivityComponentF,
    GetEventComponentF,
    AddEventComponentF,
    AddFeedBackComponentF,
    UpdateEventComponent,
    GetFeedbackComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    FullCalendarModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,


    CommonModule,
    MatPaginatorModule







  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent] // Bootstrap AppComponent here
})
export class AppModule { }
