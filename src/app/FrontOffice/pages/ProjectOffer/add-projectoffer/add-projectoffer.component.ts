import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectOffer, ProjectOfferStatus } from 'src/app/Models/project-offer';
import { ProjectOfferService } from 'src/app/Services/project-offer.service';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-projectoffer',
  templateUrl: './add-projectoffer.component.html',
  styleUrls: ['./add-projectoffer.component.css']
})
export class AddProjectofferComponent {
  protected aFormGroup: FormGroup | undefined;
  siteKey: string = '6LeCnZUpAAAAAMDRTsdCXxDoRlyGZoojn4E0JKUu';
  ProjectOfferForm: FormGroup;
  projectoffer: ProjectOffer = new ProjectOffer();
  etatValues = Object.values(ProjectOfferStatus);





  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private projectOfferService: ProjectOfferService, private location: Location, private router: Router) {
    this.ProjectOfferForm = this.formBuilder.group({
      projectTitle: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      postedDate: [this.data.date], // Initialize with the passed date
    });
  }
  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }


  
  onSubmit() {

    if (this.ProjectOfferForm.valid) {
      const projectOffer: ProjectOffer = this.ProjectOfferForm.value;
      const statusValue = this.ProjectOfferForm.get('status')?.value;
      console.log('project offet STATUS', statusValue);


      this.projectOfferService.addProjectOffer(projectOffer).subscribe(
        (addedProjectOffer: ProjectOffer) => {

          console.log('Project offer added successfully:', addedProjectOffer);
          alert('Project offer added successfully!' + addedProjectOffer);
          this.router.navigate(['/ProjectOffer/getprojectoffer']);
        },
        error => {
          console.error('Error adding project offer:', error);
        }
      );
    }
  }


  cancel() {
    this.location.back();
  }

}


