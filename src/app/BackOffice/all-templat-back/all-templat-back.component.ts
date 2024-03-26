import { Component } from '@angular/core';

@Component({
  selector: 'app-all-templat-back',
  templateUrl: './all-templat-back.component.html',
  styleUrls: ['./all-templat-back.component.css']
})
export class AllTemplatBackComponent {
  public showNavbar: boolean = true;

  toggleNavbar(): void {
    this.showNavbar = !this.showNavbar;
  }
}
