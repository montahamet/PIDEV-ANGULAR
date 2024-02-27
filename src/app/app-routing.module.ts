import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplatBackComponent } from './BackOffice/all-templat-back/all-templat-back.component';

const routes: Routes = [
 { path:"admin",
  component : AllTemplatBackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
