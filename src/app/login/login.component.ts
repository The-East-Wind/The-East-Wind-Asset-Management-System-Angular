import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z.]{3,24}$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9$_@#&!]{8,24}$/)])
  });

  forgot = false;
  authenticationError: boolean;
  @Output() authenticationEvent = new EventEmitter<boolean>();
  forgotCredentials = () => {
    this.forgot = !this.forgot;
  }

  authenticate = (event: Event) => {
    event.preventDefault();
    if (this.loginForm.valid) {
      this._authService.fetchCredentials().subscribe((data: any) => {
        const enteredData = this.loginForm.value;
        const credentials = data.filter(user => user.username === enteredData.username)[0];
        if (credentials === undefined) {
          this.authenticationError = true;
          this.loginForm.setValue({username: '', password: ''});
        } else {
          if (credentials.password === enteredData.password) {
            this.authenticationEvent.emit(true);
          } else {
            this.authenticationError = true;
            this.loginForm.setValue({username: '', password: ''});
          }
        }
      });
    }
  }

  // tslint:disable-next-line: variable-name
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }
}
