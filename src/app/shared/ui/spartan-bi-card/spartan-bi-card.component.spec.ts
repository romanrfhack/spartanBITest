import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpartanBiCardComponent } from './spartan-bi-card.component';

describe('SpartanBiCardComponent', () => {
  let component: SpartanBiCardComponent;
  let fixture: ComponentFixture<SpartanBiCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpartanBiCardComponent]
    });
    fixture = TestBed.createComponent(SpartanBiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
