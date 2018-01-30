import { Component } from '@angular/core';
import { INavbarLink } from './navbar/navbar-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navbarLinks: INavbarLink[];

  constructor() {
    this.navbarLinks = [
      { text: "Shopping Cart", routerLink: "shopping-cart" },
      {
        text: "Username", routerLink: [
          { text: "My Orders", routerLink: "/" },
          { text: "Manage Orders", routerLink: "/" },
          { text: "Manage Products", routerLink: "/" },
          { text: "Log Out", routerLink: "/" }
        ]
      }
    ]
  }
}
