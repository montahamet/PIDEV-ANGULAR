import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack } from '../../../../Models/FeedBack';
import { Event } from '../../../../Models/Event';
import { EventService } from '../../../../Services/Event.service';
import { FeedBackService } from "../../../../Services/FeedBack.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.css']
})
export class AddFeedBackComponentF implements OnInit {
  feedbackForm!: FormGroup;
  currentDate: string = '';

  feedback: FeedBack = new FeedBack();
  events: Event[] = []; // Ajout de la propriété events

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private feedbackService: FeedBackService,
              private datePipe: DatePipe) { // Injectez DatePipe dans le constructeur
  }

  ngOnInit(): void {
    this.createForm();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || ''; // Utilisez datePipe pour obtenir la date actuelle

    // this.loadEvents();
  }

  createForm(): void {
    this.feedbackForm = this.formBuilder.group({
      description: ['', Validators.required],
      note: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      // user: ['', Validators.required],
      event: ['', Validators.required],
      trainingsession: ['']
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const formData = this.feedbackForm.value;
      formData.FeedBack_date = new Date(); // Ajout de la date actuelle
      this.feedbackService.addFeedBack(formData).subscribe(
        response => {
          console.log('Feedback added successfully:', response);
          this.feedbackForm.reset();
        },
        error => {
          console.error('Error adding feedback:', error);
        }
      );
    } else {
      Object.values(this.feedbackForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  // loadEvents(): void {
  //   this.eventService.findAllEvent().subscribe(
  //     events => {
  //       this.events = events;
  //     },
  //     error => {
  //       console.error('Error loading events:', error);
  //     }
  //   );
  // }
}
