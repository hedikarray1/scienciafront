import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailUserComponent } from './dialog-detail-user.component';

describe('DialogDetailUserComponent', () => {
  let component: DialogDetailUserComponent;
  let fixture: ComponentFixture<DialogDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
