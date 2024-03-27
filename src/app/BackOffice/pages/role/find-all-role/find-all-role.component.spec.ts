import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllRoleComponent } from './find-all-role.component';

describe('FindAllRoleComponent', () => {
  let component: FindAllRoleComponent;
  let fixture: ComponentFixture<FindAllRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAllRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindAllRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
