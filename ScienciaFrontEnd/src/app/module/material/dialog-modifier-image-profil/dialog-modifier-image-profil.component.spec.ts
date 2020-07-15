import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifierImageProfilComponent } from './dialog-modifier-image-profil.component';

describe('DialogModifierImageProfilComponent', () => {
  let component: DialogModifierImageProfilComponent;
  let fixture: ComponentFixture<DialogModifierImageProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogModifierImageProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifierImageProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
