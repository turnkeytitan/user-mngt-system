import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserSignIn } from '../models/user-sign-in.type';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  signIn(params: UserSignIn): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, params.username, params.password),
    );
  }
  logOut(): Observable<any> {
    return from(signOut(this.auth));
  }
}
