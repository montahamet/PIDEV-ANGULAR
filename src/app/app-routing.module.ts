import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';
import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';


import { AddInterviewComponent } from './FrontOffice/pages/Interview/add-interview/add-interview.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';
import { UpdateJobOfferComponent } from './FrontOffice/pages/JobOffer/update-job-offer/update-job-offer.component';
import { AddProjectofferComponent } from './FrontOffice/pages/ProjectOffer/add-projectoffer/add-projectoffer.component';
import {AddQuoteComponent} from "./FrontOffice/pages/Quote/add-quote/add-quote.component";
import {GetProjectofferComponent} from "./FrontOffice/pages/ProjectOffer/get-projectoffer/get-projectoffer.component";
import {GetQuotesComponent} from "./FrontOffice/pages/Quote/get-quotes/get-quotes.component";
import {
  UpdateProjectofferComponent
} from "./FrontOffice/pages/ProjectOffer/update-projectoffer/update-projectoffer.component";
import {UpdateQuoteComponent} from "./FrontOffice/pages/Quote/update-quote/update-quote.component";
import { JobOfferDetailsComponent } from './FrontOffice/pages/JobOffer/job-offer-details/job-offer-details.component';
import {WishlistComponent} from "./FrontOffice/pages/JobOffer/wishlist/wishlist.component";



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
  {
    path: "ProjectOffer",
    component: AllTemplateFrontComponent,children:[
      { path: 'addprojectoffer', component:AddProjectofferComponent },
      { path: 'getprojectoffer', component:GetProjectofferComponent },
      { path: 'updateProjectOffer/:id', component: UpdateProjectofferComponent }, // New route for updating job offers


    ]
  },
  {
    path: "quote",
    component: AllTemplateFrontComponent,children:[
      { path: 'addquote', component:AddQuoteComponent },
      { path: 'getquote', component:GetQuotesComponent },
      { path: 'updatequote/:id', component: UpdateQuoteComponent }, // New route for updating job offers



    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
