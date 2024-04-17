import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCardWithCircularGaugeComponent } from './information-card-with-circular-gauge.component';

describe('InformationCardWithCircularGaugeComponent', () => {
  let component: InformationCardWithCircularGaugeComponent;
  let fixture: ComponentFixture<InformationCardWithCircularGaugeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCardWithCircularGaugeComponent]
    });
    fixture = TestBed.createComponent(InformationCardWithCircularGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
