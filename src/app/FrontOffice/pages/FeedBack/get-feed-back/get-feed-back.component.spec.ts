import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFeedBackComponent } from './get-feed-back.component';

describe('GetFeedBackComponent', () => {
  let component: GetFeedBackComponent;
  let fixture: ComponentFixture<GetFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFeedBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
