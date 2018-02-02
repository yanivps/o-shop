import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('navbar-id') navbarId: string = "navbar"
  @Input('fixed-top') fixedToTop: boolean;
  user: IUser;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
  }
}
