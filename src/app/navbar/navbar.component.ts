import { Component, Input } from '@angular/core';
import { INavbarLink } from './navbar-link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input('navbar-id') navbarId: string = "navbar"
  @Input() links: INavbarLink[];
  @Input('brand-link') brandLink: INavbarLink;

  isComplexLink(link: INavbarLink) {
    return Array.isArray(link.routerLink);
  }
}
