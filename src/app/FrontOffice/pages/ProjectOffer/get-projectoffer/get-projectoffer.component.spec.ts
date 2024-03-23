import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProjectofferComponent } from './get-projectoffer.component';

describe('GetProjectofferComponent', () => {
  let component: GetProjectofferComponent;
  let fixture: ComponentFixture<GetProjectofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProjectofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProjectofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
