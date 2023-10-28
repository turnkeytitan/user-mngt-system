import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import LoginForm from '../models/login-form.interface';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<LoginForm>;
  signIn$: Subscription;
  constructor(
    private fb: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.signIn$ = EMPTY_SUBSCRIPTION;
  }
  ngOnDestroy(): void {
    this.signIn$.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
      };
      this.signIn$ = this.auth.signIn(user).subscribe({
        next: (res) => {
          console.log(res.user);
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.toast.showToast({ type: 'error', message: err });
        },
      });
    }
  }
}
