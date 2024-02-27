import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';//package talka fih les fonctionalite , servcie, biblioteque teba3 routing

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent {
  title = 'Allahyrabbah';
  //recuperer la valeur de l'id elli mawjwouda fel residecne component fel button router , service predefinie qui s'appelle ActivatedRoute ==> on peut creer des services interne ng g s user
  constructor(protected ac: ActivatedRoute) {

  }//check service txt
  getParam() { // snapshot taamel capture aala url kemel
    console.log(this.ac.snapshot.params['id']);
  }
}
