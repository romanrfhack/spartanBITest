import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportChartComponent } from './export-chart.component';

describe('ExportChartComponent', () => {
  let component: ExportChartComponent;
  let fixture: ComponentFixture<ExportChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportChartComponent]
    });
    fixture = TestBed.createComponent(ExportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
