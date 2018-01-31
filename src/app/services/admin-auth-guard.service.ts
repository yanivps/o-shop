import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authUser$
      .switchMap(authUser => this.userService.get(authUser.uid))
      .map(user => user.isAdmin)
      .do(res => {
        if (!res)
          this.router.navigate(['/no-access'])
      });
  }
}
