import { TestBed } from '@angular/core/testing';

import { UserPageAuthGuard } from './user-page-auth.guard';

describe('UserPageAuthGuard', () => {
  let guard: UserPageAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPageAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
