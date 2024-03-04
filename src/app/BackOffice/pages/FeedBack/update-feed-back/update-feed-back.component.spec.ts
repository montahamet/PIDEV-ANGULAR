import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeedBackComponent } from './update-feed-back.component';

describe('UpdateFeedBackComponent', () => {
  let component: UpdateFeedBackComponent;
  let fixture: ComponentFixture<UpdateFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFeedBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
