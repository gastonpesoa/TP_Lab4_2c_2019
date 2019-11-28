import { TestBed, async, inject } from '@angular/core/testing';

import { CocineroGuard } from './cocinero.guard';

describe('CocineroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocineroGuard]
    });
  });

  it('should ...', inject([CocineroGuard], (guard: CocineroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
