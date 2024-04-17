import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersWithChecksComponent } from './filters-with-checks.component';

describe('FiltersWithChecksComponent', () => {
  let component: FiltersWithChecksComponent;
  let fixture: ComponentFixture<FiltersWithChecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersWithChecksComponent]
    });
    fixture = TestBed.createComponent(FiltersWithChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
