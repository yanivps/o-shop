import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { IAuthUser } from '../models/auth-user';
import { IUser } from '../models/user';

@Injectable()
export class UserService {
  private _baseUrl = "/users/";
  constructor(private db: AngularFireDatabase) { }

  save(authUser: IAuthUser) {
    this.db.object(this._baseUrl + authUser.uid).update({
      name: authUser.displayName,
      email: authUser.email
    });
  }

  get(userId): FirebaseObjectObservable<IUser> {
    return this.db.object(this._baseUrl + userId);
  }
}
