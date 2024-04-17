import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWithBubblesComponent } from './map-with-bubbles.component';

describe('MapWithBubblesComponent', () => {
  let component: MapWithBubblesComponent;
  let fixture: ComponentFixture<MapWithBubblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapWithBubblesComponent]
    });
    fixture = TestBed.createComponent(MapWithBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
