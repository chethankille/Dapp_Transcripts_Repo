import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegedashboardComponent } from './collegedashboard.component';

describe('CollegedashboardComponent', () => {
  let component: CollegedashboardComponent;
  let fixture: ComponentFixture<CollegedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
