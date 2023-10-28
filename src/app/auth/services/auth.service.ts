import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserSignIn } from '../models/user-sign-in.type';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  signIn(params: UserSignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.username, params.password),
    );
  }
}
