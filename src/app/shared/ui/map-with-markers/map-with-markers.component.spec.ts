import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWithMarkersComponent } from './map-with-markers.component';

describe('MapWithMarkersComponent', () => {
  let component: MapWithMarkersComponent;
  let fixture: ComponentFixture<MapWithMarkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapWithMarkersComponent]
    });
    fixture = TestBed.createComponent(MapWithMarkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
