import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKitComponent } from './list-kit.component';

describe('ListKitComponent', () => {
  let component: ListKitComponent;
  let fixture: ComponentFixture<ListKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
