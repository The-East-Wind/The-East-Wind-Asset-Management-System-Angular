import { EmployeeService } from './../employee.service';
import { Employee } from './../entities/Employee';
import { Router } from '@angular/router';
import { Credential } from './../entities/credential';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Employee;
  isAuthenticated: boolean;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z.]{3,24}$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9$_@#&!]{8,24}$/)])
  });

  forgot = false;
  authenticationError: boolean;
  @Output() authenticationEvent = new EventEmitter<Credential>();
  forgotCredentials = () => {
    this.forgot = !this.forgot;
  }

  authenticate = (event: Event) => {
    event.preventDefault();
    if (this.loginForm.valid) {
      // tslint:disable-next-line: prefer-const
      const enteredCredentials: Credential = {
        username: this.loginForm.value.username, password: this.loginForm.value.password, designation: '' };
      this._authService.fetchCredentials(enteredCredentials).subscribe((data: any) => {
        // const enteredData = this.loginForm.value;
        // const credentials = data.filter(user => user.username === enteredData.username)[0];
        const credentials = data[0];
        if (credentials === undefined) {
          this.authenticationError = true;
          this.loginForm.setValue({username: '', password: ''});
        } else {
          // tslint:disable-next-line: no-string-literal
          if (credentials.password === enteredCredentials['password']) {
            // this.authenticationEvent.emit(credentials);
            this.setAuthenticationFlags(credentials.username);
          } else {
            this.authenticationError = true;
            this.loginForm.setValue({username: '', password: ''});
          }
        }
      });
    }
  }

  setAuthenticationFlags(username: string): void {
    if (username !== undefined) {
      this._employeeService.fetchEmployeeWithUsername(username).subscribe((data: any) => {
        this.user = data[0];
        if (this.user !== undefined) {
          switch (this.user.employeeDesignation) {
            case 'Employee': this._authService.isEmployee = true; break;
            case 'Manager': this._authService.isManager = true; break;
            case 'Admin': this._authService.isAdmin = true; break;
          }
          this.isAuthenticated = true;
          const path = '/' + this.user.employeeDesignation.toLowerCase();
          this._router.navigate([path]);
        }
      });
    }
  }

  logout = () => {
    switch (this.user.employeeDesignation) {
      case 'Employee': this._authService.isEmployee = false; break;
      case 'Manager': this._authService.isManager = false; break;
      case 'Admin': this._authService.isAdmin = false; break;
    }
    this.isAuthenticated = false;
    this.user = undefined;
  }
  // tslint:disable-next-line: variable-name
  constructor(private _authService: AuthService, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit(): void {
  }
}
