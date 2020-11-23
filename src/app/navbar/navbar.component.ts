import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;
  constructor(
    public authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe((appUser) => {
      this.appUser = appUser;
    });
    this.cart$ = await this.cartService.getCart();
  }

  logout(): void {
    this.authService.logout();
  }
}
