import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";
import { IAuthUser } from '../models/auth-user';
import { IUser } from '../models/user';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
  authUser$: Observable<IAuthUser>;

  constructor(private _firebaseAuth: AngularFireAuth,
              private _db: AngularFireDatabase,
              private _router: Router,
              private _route: ActivatedRoute,
              private _userService: UserService) {
    
    this.authUser$ = _firebaseAuth.authState
      .map(firebaseUser => {
        if (!firebaseUser) 
          return null;
        
        return { uid: firebaseUser.uid, displayName: firebaseUser.displayName, email: firebaseUser.email };
      });
  }

  signInWithGoogle() {
    this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(res => {
        this._router.navigate(['/']);
      });
  }

  get user$(): Observable<IUser> {
    return this.authUser$
      .switchMap(authUser => {
        if (authUser) return this._userService.get(authUser.uid);

        return Observable.of(null);
      })
  }
}
