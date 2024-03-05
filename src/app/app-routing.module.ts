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
import {AddEventComponentF} from "./FrontOffice/pages/Event/add-event/add-event.component";
import {  AddFeedBackComponentF} from "./FrontOffice/pages/FeedBack/add-feed-back/add-feed-back.component";

const routes: Routes = [
  {
    path: '',
    component: AllTemplateFrontComponent
  },
  {
    path: 'admin',
    component: AllTemplatBackComponent
  },
  {
    path:'ActivityB',
    component: AllTemplatBackComponent,
    children:[
      { path: 'allactivitiesB', component: GetActivityComponentBack },

    ]
  },
  {
    path : 'feedback',
    component : AllTemplateFrontComponent,
    children:[
      {path :'add',component: AddFeedBackComponentF}
    ]
  },
  {
    path: 'ActivityF',
    component: AllTemplateFrontComponent,
    children:[
      { path: 'allactivitiesF', component: GetActivityComponentFront },
      { path: 'AddActivityF', component: AddActivityComponentFront },
      {path: 'updateactivityF/:id', component: UpdateActivityComponentF}
    ]
  },
  {
    path: 'Event',
    component: AllTemplateFrontComponent,
    children:[
      { path: 'allEventF', component: GetEventComponentF },
      { path: 'AddEvenF', component: AddEventComponentF },
      // { path: 'allactivitiesB', component: GetActivityComponentBack },
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
