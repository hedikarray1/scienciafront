import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFormationComponent } from './modifier-formation.component';

describe('ModifierFormationComponent', () => {
  let component: ModifierFormationComponent;
  let fixture: ComponentFixture<ModifierFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
