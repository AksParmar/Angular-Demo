import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService) {
    console.log(authService.isTokenExpired());
  }

  formControlValidationStatus(formControl: FormControl) {
    if (formControl.valid) {
      return 'is-valid';
    }

    if (formControl.invalid && (formControl.dirty || formControl.touched)) {
      return 'is-invalid';
    }

    return '';
  }

  onSubmit() {
    let payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
  }
}
