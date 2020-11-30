import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent, RegisterComponent],
  imports: [SharedModule, RouterModule.forChild([]), NgbModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
