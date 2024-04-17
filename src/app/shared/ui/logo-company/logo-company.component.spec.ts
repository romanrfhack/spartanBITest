import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCompanyComponent } from './logo-company.component';

describe('LogoCompanyComponent', () => {
  let component: LogoCompanyComponent;
  let fixture: ComponentFixture<LogoCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoCompanyComponent]
    });
    fixture = TestBed.createComponent(LogoCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
