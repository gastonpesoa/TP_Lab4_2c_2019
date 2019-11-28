import { TestBed, async, inject } from '@angular/core/testing';

import { SocioGuard } from './socio.guard';

describe('SocioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocioGuard]
    });
  });

  it('should ...', inject([SocioGuard], (guard: SocioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
