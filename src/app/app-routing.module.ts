import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from 'src/assets/FrontOffice/all-template-front/all-template-front.component';


const routes: Routes = [
  {
    path: "",
    component:AllTemplateFrontComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
