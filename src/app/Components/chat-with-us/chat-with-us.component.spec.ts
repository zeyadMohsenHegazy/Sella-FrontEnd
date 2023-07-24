import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithUSComponent } from './chat-with-us.component';

describe('ChatWithUSComponent', () => {
  let component: ChatWithUSComponent;
  let fixture: ComponentFixture<ChatWithUSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWithUSComponent]
    });
    fixture = TestBed.createComponent(ChatWithUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
