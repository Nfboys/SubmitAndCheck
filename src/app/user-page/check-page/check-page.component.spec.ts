import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPageComponent } from './check-page.component';

describe('CheckPageComponent', () => {
  let component: CheckPageComponent;
  let fixture: ComponentFixture<CheckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
