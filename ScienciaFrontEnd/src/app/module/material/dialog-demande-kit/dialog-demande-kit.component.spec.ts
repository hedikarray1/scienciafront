import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDemandeKitComponent } from './dialog-demande-kit.component';

describe('DialogDemandeKitComponent', () => {
  let component: DialogDemandeKitComponent;
  let fixture: ComponentFixture<DialogDemandeKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDemandeKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDemandeKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
