import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'signIn', component: SignInComponent },
        ]) // Because we inject service in our component
      ],
      declarations: [SignInComponent]
    })
      .compileComponents();

      router = TestBed.get(Router); // Just if we need to test Route Service functionality
    router.initialNavigation(); // Just if we need to test Route Service functionality
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('testing login', () => {
    expect(component.signInForm).toBeTruthy();
  });

  it('login initial state', () => {
    expect(component.signInForm).toBeDefined();
    expect(component.signInForm.invalid).toBeTruthy();
    expect(component.signInForm.controls['email'].invalid && component.signInForm.controls['email'].dirty || component.signInForm.controls['email'].touched).toBeFalsy();
  });

  describe('signInSubmit', ()=> {
    it('form invalid', ()=> {
      component.submitLoading = true;
      component.signInSubmit();
      expect(component.signInForm.invalid).toBeTrue();
    })
    it('form valid', ()=> {
      spyOn(localStorage, 'setItem');
      spyOn(router, 'navigate');
      component.signInForm.patchValue({
        email: 'meenakshi@gmail.com',
        password: '12345'
      });
      component.submitLoading = true;

      component.signInSubmit();
      expect(component.signInForm.invalid).toBeFalse();
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'login credentials');
      expect(router.navigate).toHaveBeenCalledWith(['/trading']);
    })
  })
});
