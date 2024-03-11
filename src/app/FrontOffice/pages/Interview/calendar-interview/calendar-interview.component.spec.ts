import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInterviewComponent } from './calendar-interview.component';

describe('CalendarInterviewComponent', () => {
  let component: CalendarInterviewComponent;
  let fixture: ComponentFixture<CalendarInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
