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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindAllUsersComponent } from './BackOffice/pages/user/find-all-users/find-all-users.component';
import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';
import { AddInterviewComponent } from './FrontOffice/pages/Interview/add-interview/add-interview.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';
import { UpdateJobOfferComponent } from './FrontOffice/pages/JobOffer/update-job-offer/update-job-offer.component';
import { AddEventComponent } from './BackOffice/pages/Event/add-event/add-event.component';
import { UpdateEventComponent } from './BackOffice/pages/Event/update-event/update-event.component';
import { GetEventComponent } from './BackOffice/pages/Event/get-event/get-event.component';
import { AddFeedBackComponent } from './BackOffice/pages/FeedBack/add-feed-back/add-feed-back.component';
import { UpdateFeedBackComponent } from './BackOffice/pages/FeedBack/update-feed-back/update-feed-back.component';
import { GetFeedBackComponent } from './BackOffice/pages/FeedBack/get-feed-back/get-feed-back.component';
import { AddActivityComponent } from './BackOffice/pages/Activity/add-activity/add-activity.component';
import { UpdateActivityComponent } from './BackOffice/pages/Activity/update-activity/update-activity.component';
import { GetActivityComponent } from './BackOffice/pages/Activity/get-activity/get-activity.component';
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
    AddInterviewComponent,
    UpdateInterviewComponent,
    AddJobOfferComponent,
    UpdateJobOfferComponent,
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
    AddProjectofferComponent,
    AddQuoteComponent,
    GetProjectofferComponent,
    GetQuotesComponent,
    UpdateProjectofferComponent,
    UpdateQuoteComponent,
    FilterPipe,
    WishlistComponent,
    



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





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
