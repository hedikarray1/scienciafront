import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeEmplyeComponent } from './list-demande-emplye.component';

describe('ListDemandeEmplyeComponent', () => {
  let component: ListDemandeEmplyeComponent;
  let fixture: ComponentFixture<ListDemandeEmplyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandeEmplyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeEmplyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
