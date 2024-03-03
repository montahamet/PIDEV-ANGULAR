import { Component } from '@angular/core';
import { Candidacy } from 'src/app/Models/candidacy';
import { CandidacyService } from 'src/app/Services/candidacy.service';

@Component({
  selector: 'app-find-all-candidacies',
  templateUrl: './find-all-candidacies.component.html',
  styleUrls: ['./find-all-candidacies.component.css']
})
export class FindAllCandidaciesComponent {
  candidacies: Candidacy[] = [];
  constructor(private c:CandidacyService){}

  loadCandidacies(){
    this.c.findAllCandidacies().subscribe(candidacy=>this.candidacies=candidacy);
  }
  ngOnInit(){
    this.loadCandidacies();
  }

}
