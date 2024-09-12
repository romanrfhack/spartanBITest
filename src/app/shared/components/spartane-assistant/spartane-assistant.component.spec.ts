import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpartaneAssistantComponent } from './spartane-assistant.component';

describe('SpartaneAssistantComponent', () => {
  let component: SpartaneAssistantComponent;
  let fixture: ComponentFixture<SpartaneAssistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpartaneAssistantComponent]
    });
    fixture = TestBed.createComponent(SpartaneAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
