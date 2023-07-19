import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPicksComponent } from './top-picks.component';

describe('TopPicksComponent', () => {
  let component: TopPicksComponent;
  let fixture: ComponentFixture<TopPicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPicksComponent]
    });
    fixture = TestBed.createComponent(TopPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
