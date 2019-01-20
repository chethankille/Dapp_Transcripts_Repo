import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMessageRendererComponent } from './child-message-renderer.component';

describe('ChildMessageRendererComponent', () => {
  let component: ChildMessageRendererComponent;
  let fixture: ComponentFixture<ChildMessageRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildMessageRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildMessageRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
