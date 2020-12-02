import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  error: String;
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  loginStandard(form): void {
    this.authService
      .loginStandard(form.value)
      .then((result) => console.log(result))
      .catch((error) => (this.error = error));
  }

  onSubmit(form) {}
}
