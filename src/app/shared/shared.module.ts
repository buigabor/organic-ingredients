import { AdminViewOrderComponent } from './components/view-order/admin-view-order.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AngularMaterialModule } from 'app/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderCardComponent } from './components/order-card/order-card.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderCardComponent,
    AdminViewOrderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    AdminViewOrderComponent,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
})
export class SharedModule {}
