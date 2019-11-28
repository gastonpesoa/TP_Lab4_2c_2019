import { TestBed, async, inject } from '@angular/core/testing';

import { MozoGuard } from './mozo.guard';

describe('MozoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MozoGuard]
    });
  });

  it('should ...', inject([MozoGuard], (guard: MozoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
