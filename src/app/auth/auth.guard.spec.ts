import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "./auth.service";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
    auth = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', ()=> {
    it('is LoggedIn', () => {
      spyOn(auth, 'isLoggedIn').and.returnValue(true);
      expect(guard.canActivate()).toBeTrue();
    });
    it('is not LoggedIn', () => {
      spyOn(auth, 'isLoggedIn').and.returnValue(false);
      expect(guard.canActivate()).toBeFalse();
    });
  })
});
