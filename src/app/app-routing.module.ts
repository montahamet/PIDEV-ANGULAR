import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';

import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';
import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';

const routes: Routes = [
  {
    path: "",
    component: AllTemplateFrontComponent
  },
  {
    path: "admin",
    component: AllTemplatBackComponent
  },
  
  {
    path: "JobOffer",
    component: AllTemplateFrontComponent,children:[
      { path: 'addJobOffersfront', component:AddJobOfferComponent },
      { path: 'findAllJobOffersfront', component: FindAllJobOffersComponent },
    ]
  },
  {
    path: "findAllCandidaciesfront",
    component: FindAllCandidaciesComponent
  },
  {
    path: "findAllInterviewsfront",
    component: FindAllInterviewsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
