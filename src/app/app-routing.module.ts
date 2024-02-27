import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';

import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';

const routes: Routes = [
  {
    path:"",
    component :AllTemplateFrontComponent
  },
  {
    path:"admin",
    component :AllTemplatBackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
