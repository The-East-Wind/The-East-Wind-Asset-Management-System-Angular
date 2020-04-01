import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asset Management System';
  isAuthenticated = false;
  authenticate = () => {
    this.isAuthenticated = true;
  }
  logout = () => {
    this.isAuthenticated = false;
  }
}
