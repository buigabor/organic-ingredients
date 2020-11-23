import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: firebase.User): void {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      isAdmin: true,
    });
  }

  get(userId: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + userId).valueChanges();
  }
}
