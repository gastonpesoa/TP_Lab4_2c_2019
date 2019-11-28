import { TestBed, async, inject } from '@angular/core/testing';

import { BarmanGuard } from './barman.guard';

describe('BarmanGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarmanGuard]
    });
  });

  it('should ...', inject([BarmanGuard], (guard: BarmanGuard) => {
    expect(guard).toBeTruthy();
  }));
});
