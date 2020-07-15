import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormationEcoleComponent } from './list-formation-ecole.component';

describe('ListFormationEcoleComponent', () => {
  let component: ListFormationEcoleComponent;
  let fixture: ComponentFixture<ListFormationEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormationEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormationEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
