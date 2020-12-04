import { TestBed } from '@angular/core/testing';

import { AlanAiService } from './alan-ai.service';

describe('AlanAiService', () => {
  let service: AlanAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlanAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
