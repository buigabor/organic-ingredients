import { Component } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth) {}

  login(): void {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
