import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from '../../../../Models/FeedBack';

@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css']
})
export class AddFeedBackComponentF {
  feedbackForm!: FormGroup;
  feedback: FeedBack = new FeedBack(); // Déclarez la propriété feedback

  constructor(private formBuilder: FormBuilder) {
    this.createForm(); // Initialisez le formulaire dans le constructeur
  }

  // Fonction pour créer le formulaire avec les contrôles de saisie
  createForm() {
    this.feedbackForm = this.formBuilder.group({
      description: ['', Validators.required], // Champ de description avec validation requise
      note: ['', Validators.required], // Champ de note avec validation requise
      user: ['', Validators.required], // Champ d'utilisateur avec validation requise
      event: ['', Validators.required], // Champ d'événement avec validation requise
      trainingsession: ['', Validators.required] // Champ de session de formation avec validation requise
    });
  }

  // Fonction pour soumettre le formulaire
  onSubmit() {
    if (this.feedbackForm.valid) { // Vérifiez si le formulaire est valide avant de soumettre
      // Soumettre le formulaire ici
    } else {
      // Marquez tous les champs du formulaire comme touchés pour afficher les messages d'erreur
      Object.values(this.feedbackForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
