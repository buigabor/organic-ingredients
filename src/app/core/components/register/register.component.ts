import { AuthService } from 'shared/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  minDate: Date;
  maxDate: Date;

  constructor(private authService: AuthService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 130, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {}
  onSubmit(form) {
    this.authService.register(form.value);
  }
}
