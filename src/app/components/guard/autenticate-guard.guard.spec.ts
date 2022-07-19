import { TestBed } from '@angular/core/testing';

import { AutenticateGuardGuard } from './autenticate-guard.guard';

describe('AutenticateGuardGuard', () => {
  let guard: AutenticateGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticateGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
