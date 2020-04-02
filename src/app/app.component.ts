import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }
  title = 'Asset Management System';
  isAuthenticated = false;

  authenticate = (isAuthenticated: boolean) => {
    if (isAuthenticated === true) {
      this.isAuthenticated = isAuthenticated;
      this.router.navigate(['/employee']);
    }
  }

  logout = () => {
    this.isAuthenticated = false;
  }

  ngOnInit() {
  }
}
