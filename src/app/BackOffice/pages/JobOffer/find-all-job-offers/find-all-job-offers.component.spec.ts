import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllJobOffersComponent } from './find-all-job-offers.component';

describe('FindAllJobOffersComponent', () => {
  let component: FindAllJobOffersComponent;
  let fixture: ComponentFixture<FindAllJobOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAllJobOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAllJobOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
