import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { IAuthUser } from './models/auth-user';
import { IUser } from './models/user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(authUser: IAuthUser) {
    this.db.object("/users/" + authUser.uid).update({
      name: authUser.displayName,
      email: authUser.email
    });
  }

  get(userId): FirebaseObjectObservable<IUser> {
    return this.db.object("/users/" + userId);
  }
}
