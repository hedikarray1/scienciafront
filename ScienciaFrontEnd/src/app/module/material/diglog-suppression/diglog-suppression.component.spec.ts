import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiglogSuppressionComponent } from './diglog-suppression.component';

describe('DiglogSuppressionComponent', () => {
  let component: DiglogSuppressionComponent;
  let fixture: ComponentFixture<DiglogSuppressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiglogSuppressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiglogSuppressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
