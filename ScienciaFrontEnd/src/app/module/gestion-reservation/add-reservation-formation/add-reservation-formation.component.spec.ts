import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationFormationComponent } from './add-reservation-formation.component';

describe('AddReservationFormationComponent', () => {
  let component: AddReservationFormationComponent;
  let fixture: ComponentFixture<AddReservationFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReservationFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservationFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
