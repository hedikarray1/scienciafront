import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationFormateurComponent } from './list-reservation-formateur.component';

describe('ListReservationFormateurComponent', () => {
  let component: ListReservationFormateurComponent;
  let fixture: ComponentFixture<ListReservationFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReservationFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservationFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
