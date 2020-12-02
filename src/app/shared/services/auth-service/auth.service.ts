import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private router: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  loginWithGoogle() {
    const returnUrl =
      this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    const returnUrl =
      this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.signInWithPopup(provider);
  }

  loginStandard(value) {
    const returnUrl =
      this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  register(value) {
    const returnUrl =
      this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    firebase
      .auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        result.user.updateProfile({
          displayName: value.firstName + ' ' + value.lastName,
        });
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);
      })
    );
  }
}
