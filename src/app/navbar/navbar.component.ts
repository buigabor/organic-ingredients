import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { ShoppingCart } from '../models/shopping-cart';

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
