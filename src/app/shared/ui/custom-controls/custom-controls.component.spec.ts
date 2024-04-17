import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControlsComponent } from './custom-controls.component';

describe('CustomControlsComponent', () => {
  let component: CustomControlsComponent;
  let fixture: ComponentFixture<CustomControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomControlsComponent]
    });
    fixture = TestBed.createComponent(CustomControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
