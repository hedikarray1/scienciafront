import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPasswordProfileComponent } from './modifier-password-profile.component';

describe('ModifierPasswordProfileComponent', () => {
  let component: ModifierPasswordProfileComponent;
  let fixture: ComponentFixture<ModifierPasswordProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPasswordProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPasswordProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
