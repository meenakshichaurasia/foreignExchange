import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn', ()=> {
    it('isLoggedIn false', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.isLoggedIn()).toBeFalse();
    });
    it('isLoggedIn true', () => {
      spyOn(localStorage, 'getItem').and.returnValue('login credentials');
      expect(service.isLoggedIn()).toBeTrue();
    });
  })
});
