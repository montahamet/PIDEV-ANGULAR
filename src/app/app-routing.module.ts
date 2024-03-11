import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';
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
import { AddInterviewComponent } from './FrontOffice/pages/Interview/add-interview/add-interview.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';
import { JobOfferDetailsComponent } from './FrontOffice/pages/JobOffer/job-offer-details/job-offer-details.component';
import {WishlistComponent} from "./FrontOffice/pages/JobOffer/wishlist/wishlist.component";


const routes: Routes = [
  {
    path: "",
    component: AllTemplateFrontComponent,
    children:[
      {path:"",
      component:HomeFrontComponent
    }
    ]
  },
  {
    path: "admin",
    component: AllTemplatBackComponent
  },

  {

    path: "JobOffer",
    component: AllTemplateFrontComponent,children:[
      { path: 'addJobOffersfront', component:AddJobOfferComponent },
      { path: 'job-offer-details/:id', component: JobOfferDetailsComponent },
      { path: 'findAllJobOffersfront', component: FindAllJobOffersComponent },
      { path: 'updateJobOffer/:id', component: UpdateJobOfferComponent },
      { path: 'wishlist', component: WishlistComponent },


    ]
  },
  {
    path: "Candidacy",
    component: AllTemplateFrontComponent,children:[
    {path: "findAllCandidaciesfront",component: FindAllCandidaciesComponent}
    ]

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

  },
  {
    path: "Interview",
    component: AllTemplateFrontComponent,
    children: [
      { path: 'findAllInterviewsfront', component: FindAllInterviewsComponent },
      { path: 'addInterviewfront', component: AddInterviewComponent },
      { path: 'updateInterview/:id', component: UpdateInterviewComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
