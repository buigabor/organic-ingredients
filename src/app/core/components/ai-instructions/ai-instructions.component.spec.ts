import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInstructionsComponent } from './ai-instructions.component';

describe('AiInstructionsComponent', () => {
  let component: AiInstructionsComponent;
  let fixture: ComponentFixture<AiInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
