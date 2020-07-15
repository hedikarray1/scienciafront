import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifierImageStockComponent } from './dialog-modifier-image-stock.component';

describe('DialogModifierImageStockComponent', () => {
  let component: DialogModifierImageStockComponent;
  let fixture: ComponentFixture<DialogModifierImageStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogModifierImageStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogModifierImageStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
