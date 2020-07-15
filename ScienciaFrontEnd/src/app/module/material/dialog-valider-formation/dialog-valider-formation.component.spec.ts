import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogValiderFormationComponent } from './dialog-valider-formation.component';

describe('DialogValiderFormationComponent', () => {
  let component: DialogValiderFormationComponent;
  let fixture: ComponentFixture<DialogValiderFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogValiderFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogValiderFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
