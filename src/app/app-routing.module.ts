import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import {FindAllUsersComponent} from "./BackOffice/pages/user/find-all-users/find-all-users.component";
import {RegisterComponent} from "./BackOffice/pages/user/register/register.component";

import {UpdateUserComponent} from "./BackOffice/pages/user/update-user/update-user.component";
import {UserDetailComponent} from "./BackOffice/pages/user/user-detail/user-detail.component";
import {FindAllRoleComponent} from "./BackOffice/pages/role/find-all-role/find-all-role.component";
import {AddRoleComponent} from "./BackOffice/pages/role/add-role/add-role.component";
import {UpdateRoleComponent} from "./BackOffice/pages/role/update-role/update-role.component";


import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';

import { FindAllJobOffersComponent } from './FrontOffice/pages/JobOffer/find-all-job-offers/find-all-job-offers.component';
import { FindAllCandidaciesComponent } from './FrontOffice/pages/Candidacy/find-all-candidacies/find-all-candidacies.component';
import { FindAllInterviewsComponent } from './FrontOffice/pages/Interview/find-all-interviews/find-all-interviews.component';
import { UpdateJobOfferComponent } from './FrontOffice/pages/JobOffer/update-job-offer/update-job-offer.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';
import {UpdateEventComponent} from "./FrontOffice/pages/Event/update-event/update-event.component";
import {GetFeedbackComponent} from "./BackOffice/pages/FeedBack/get-feed-back/get-feed-back.component";





import { AddInterviewComponent } from './FrontOffice/pages/Interview/add-interview/add-interview.component';
import { AddJobOfferComponent } from './FrontOffice/pages/JobOffer/add-job-offer/add-job-offer.component';
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
import {GetActivityComponentBack} from "./BackOffice/pages/Activity/get-activity/get-activity.component";
import {AddActivityComponentFront} from "./FrontOffice/pages/Activity/add-activity/add-activity.component";
import {GetActivityComponentFront} from "./FrontOffice/pages/Activity/get-activity/get-activity.component";
import {UpdateActivityComponentF} from "./FrontOffice/pages/Activity/update-activity/update-activity.component";
import {AddEventComponentF} from "./FrontOffice/pages/Event/add-event/add-event.component";
import {GetEventComponentF} from "./FrontOffice/pages/Event/get-event/get-event.component";




const routes: Routes = [
  {

    path: "register",
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
      {path:"updateuser/:id", component:UpdateUserComponent},
      {path:"userdetails/:id", component:UserDetailComponent},
      {path:"findallrole", component:FindAllRoleComponent},
      {path:"addrole", component:AddRoleComponent},
      {path:"updaterole/:id", component:UpdateRoleComponent},
    ]},





      { path: 'allactivitiesB', component: GetActivityComponentBack },

    ]
  },
//   {  path: 'admin',
//     component: AllTemplatBackComponent ,
//     import: { HomeFrontComponent }, from, './FrontOffice/home-front/home-front.component': ,
// import { AddInterviewComponent } from './FrontOffice/pages/Interview/add-interview/add-interview.component';
// import { UpdateInterviewComponent } from './FrontOffice/pages/Interview/update-interview/update-interview.component';
// import { JobOfferDetailsComponent } from './FrontOffice/pages/JobOffer/job-offer-details/job-offer-details.component';
// import {WishlistComponent} from "./FrontOffice/pages/JobOffer/wishlist/wishlist.component";
// },

  {
    path: "",
    component: AllTemplateFrontComponent,
    children:[
      {path:"", component:HomeFrontComponent }
    ]},


  {
    path: "JobOffer",
    component: AllTemplateFrontComponent,children:[
      { path: 'addJobOffersfront', component:AddJobOfferComponent },
      { path: 'job-offer-details/:id', component: JobOfferDetailsComponent },
      { path: 'findAllJobOffersfront', component: FindAllJobOffersComponent },
      { path: 'updateJobOffer/:id', component: UpdateJobOfferComponent },
      { path: 'wishlist', component: WishlistComponent },

    ]},
  {
    path: "Candidacy",
    component: AllTemplateFrontComponent,children:[
    {path: "findAllCandidaciesfront",component: FindAllCandidaciesComponent}
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
      { path: 'updatequote/:id', component: UpdateQuoteComponent },
    ]
  },
  {
    path: "ActivityF",
    component: AllTemplateFrontComponent,children:[
      { path: 'addActivityF', component:AddActivityComponentFront },
      { path: 'getActivityF', component:GetActivityComponentFront },
      { path: 'updateActivityF/:id', component:UpdateActivityComponentF },
    ]
  },
  {
    path:"EventF",
    component: AllTemplateFrontComponent, children:[
      {path: 'addEventF', component: AddEventComponentF},
      { path: 'getEventF', component: GetEventComponentF},
      { path: 'UpdateEvent/:id', component: UpdateEventComponent},    ]
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
