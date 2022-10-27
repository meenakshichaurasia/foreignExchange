import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  submitLoading: boolean = false;
  signInForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    /**
      * Sign in Form Definition
      */
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * This Method call when submit the login
   */
  signInSubmit(): void {
    this.submitLoading = true;

    if (this.signInForm.invalid) {
      Object.keys(this.signInForm.controls).forEach(key => {
        this.signInForm.controls[key].markAsDirty();
      });
      this.submitLoading = false;
      return;
    }

    localStorage.setItem('token', 'login credentials');
    this.router.navigate(['/trading']);
  }

}
