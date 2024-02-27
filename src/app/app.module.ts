import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from '../assets/FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from '../assets/FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from '../assets/FrontOffice/header-front/header-front.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
