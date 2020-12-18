import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { AiInstructionsComponent } from './components/ai-instructions/ai-instructions.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AiInstructionsComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([]), NgbModule],
  exports: [NavbarComponent, AiInstructionsComponent],
})
export class CoreModule {}
