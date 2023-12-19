import { Component, HostListener, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent {

  @Input() userLogged!: User;

  showNav = true;

  toggleNav(): void {
    this.showNav = !this.showNav;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.showNav = false;
    this.updateToggleState();
  }

  private updateToggleState(): void {
    const smallViewport = window.innerWidth <= 768;
    this.showNav = !smallViewport;
  }
}
