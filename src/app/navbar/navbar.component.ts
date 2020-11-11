import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(public authService: AuthService) {
    authService.appUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
