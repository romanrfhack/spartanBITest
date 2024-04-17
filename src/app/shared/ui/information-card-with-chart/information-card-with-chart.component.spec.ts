import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationCardWithChartComponent } from './information-card-with-chart.component';


describe('InformationCardComponent', () => {
  let component: InformationCardWithChartComponent;
  let fixture: ComponentFixture<InformationCardWithChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCardWithChartComponent]
    });
    fixture = TestBed.createComponent(InformationCardWithChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
