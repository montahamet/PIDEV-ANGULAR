import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectofferComponent } from './update-projectoffer.component';

describe('UpdateProjectofferComponent', () => {
  let component: UpdateProjectofferComponent;
  let fixture: ComponentFixture<UpdateProjectofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProjectofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
