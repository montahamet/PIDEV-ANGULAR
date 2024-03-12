import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedBackComponentF } from './add-feed-back.component';

describe('AddFeedBackComponent', () => {
  let component: AddFeedBackComponentF;
  let fixture: ComponentFixture<AddFeedBackComponentF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedBackComponentF ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedBackComponentF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
