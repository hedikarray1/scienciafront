import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFormateurComponent } from './detail-formateur.component';

describe('DetailFormateurComponent', () => {
  let component: DetailFormateurComponent;
  let fixture: ComponentFixture<DetailFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
