import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCardOnlyTextComponent } from './information-card-only-text.component';

describe('InformationCardOnlyTextComponent', () => {
  let component: InformationCardOnlyTextComponent;
  let fixture: ComponentFixture<InformationCardOnlyTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationCardOnlyTextComponent]
    });
    fixture = TestBed.createComponent(InformationCardOnlyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
