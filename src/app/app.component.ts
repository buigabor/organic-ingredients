import { UserService } from 'shared/services/user-service/user.service';
import { Router } from '@angular/router';

import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'shop-for-ingredients';
  authSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.authSub = this.authService.user$.subscribe((user) => {
      if (user) {
        this.userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          this.router.navigate([returnUrl]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
