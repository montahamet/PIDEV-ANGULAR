import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidacyComponent } from './update-candidacy.component';

describe('UpdateCandidacyComponent', () => {
  let component: UpdateCandidacyComponent;
  let fixture: ComponentFixture<UpdateCandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
