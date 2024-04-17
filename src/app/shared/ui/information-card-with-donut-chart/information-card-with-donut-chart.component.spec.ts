import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCardWithDonutChartComponent } from './information-card-with-donut-chart.component';

describe('InformationCardWithDonutChartComponent', () => {
  let component: InformationCardWithDonutChartComponent;
  let fixture: ComponentFixture<InformationCardWithDonutChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCardWithDonutChartComponent]
    });
    fixture = TestBed.createComponent(InformationCardWithDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
