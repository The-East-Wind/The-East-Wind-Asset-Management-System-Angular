import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  forgot = false;
  forgotCredentials = () => {
    this.forgot = !this.forgot;
  }
  login = (event) => {
    console.log(event);
    console.log(this.loginForm.value);
  }
  constructor() { }

  ngOnInit(): void {
  }
}
