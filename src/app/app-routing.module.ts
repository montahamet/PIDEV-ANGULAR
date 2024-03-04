import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';

import {FindAllUsersComponent} from "./BackOffice/pages/user/find-all-users/find-all-users.component";
import {RegisterComponent} from "./BackOffice/pages/user/register/register.component";

import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';
import { UpdateJobOfferComponent } from './FrontOffice/pages/JobOffer/update-job-offer/update-job-offer.component';
import { GetActivityComponentFront } from './FrontOffice/pages/Activity/get-activity/get-activity.component';
import {GetActivityComponentBack} from "./BackOffice/pages/Activity/get-activity/get-activity.component";
import {AddActivityComponentFront} from "./FrontOffice/pages/Activity/add-activity/add-activity.component";
import {UpdateActivityComponentF} from "./FrontOffice/pages/Activity/update-activity/update-activity.component";
import {GetEventComponentF} from "./FrontOffice/pages/Event/get-event/get-event.component";

const routes: Routes = [
  {
    path: '',
    component: AllTemplateFrontComponent
  },
  {
    path: 'admin',
    component: AllTemplatBackComponent
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AddInterviewComponent } from './BackOffice/pages/Interview/add-interview/add-interview.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';


const routes: Routes = [
  {
    path: "Register",
    component: RegisterComponent
  },
  {

    path: "home",
    component: AllTemplateFrontComponent,
    children:[
      {path:"",
      component:HomeFrontComponent
    }
    ]
  },
  {
    path: "admin",

    component: AllTemplatBackComponent,
    children:[
      {path:"findall", component:FindAllUsersComponent},
    ]},

{
    component: AllTemplatBackComponent,
    children:[{ path: 'JobOffer', component:AllTemplatBackComponent,children:[
      { path: 'findAllJobOffers', component: FindAllJobOffersComponent },
      { path: 'addJobOffer', component: AddJobOfferComponent },
      { path: 'updateJobOffer/:id', component: UpdateJobOfferComponent },
    ] }

    ]
  },

  {
    path: 'Activity',
    component: AllTemplateFrontComponent,
    children:[
      { path: 'allactivitiesF', component: GetActivityComponentFront },
      { path: 'allactivitiesB', component: GetActivityComponentBack },
      { path: 'AddActivityF', component: AddActivityComponentFront },
      {path: 'updateactivityF/:id', component: UpdateActivityComponentF}
    ]
  },
  {
    path: 'Event',
    component: AllTemplateFrontComponent,
    children:[
      { path: 'allEventF', component: GetEventComponentF },
      // { path: 'allactivitiesB', component: GetActivityComponentBack },
      // { path: 'AddActivityF', component: AddActivityComponentFront },
      // {path: 'updateactivityF/:id', component: UpdateActivityComponentF}
    ]
  },
  {
    path: 'JobOffer',
    component: AllTemplateFrontComponent,
    children: [
      { path: 'addJobOffersfront', component: AddJobOfferComponent },
      { path: 'findAllJobOffersfront', component: FindAllJobOffersComponent },
      { path: 'updateJobOffer/:id', component: UpdateJobOfferComponent }

    ]
  },
  {
    path: 'findAllCandidaciesfront',
    component: FindAllCandidaciesComponent
  },
  {
    path: 'findAllInterviewsfront',
    component: FindAllInterviewsComponent
  },
    path: "Interview",
    component: AllTemplateFrontComponent,
    children: [
      { path: 'findAllInterviewsfront', component: FindAllInterviewsComponent },
      { path: 'addInterviewfront', component: AddInterviewComponent },
      { path: 'updateInterview/:id', component: UpdateInterviewComponent }, // Update this line
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
