import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _authUserSubscription: Subscription;
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this._authUserSubscription = this.authService.authUser$
      .subscribe(firebaseUser => {
        if (firebaseUser) {
          this.userService.save(firebaseUser);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
      });
  }

  ngOnDestroy() {
    this._authUserSubscription.unsubscribe();
  }
}
