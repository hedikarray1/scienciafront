import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedBackComponent } from './list-feed-back.component';

describe('ListFeedBackComponent', () => {
  let component: ListFeedBackComponent;
  let fixture: ComponentFixture<ListFeedBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeedBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
