import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCardWithDonutChartKendoComponent } from './information-card-with-donut-chart-kendo.component';

describe('InformationCardWithDonutChartKendoComponent', () => {
  let component: InformationCardWithDonutChartKendoComponent;
  let fixture: ComponentFixture<InformationCardWithDonutChartKendoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCardWithDonutChartKendoComponent]
    });
    fixture = TestBed.createComponent(InformationCardWithDonutChartKendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
