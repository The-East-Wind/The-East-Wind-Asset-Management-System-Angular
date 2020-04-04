import { retry, catchError } from 'rxjs/operators';
import { Credential } from '../entities/credential';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localUrl = './assets/credentials.json';
  isEmployee = false;
  isManager = false;
  isAdmin = false;
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {
  }

  // @TODO make method to post once original backend is ready
  fetchCredentials(enteredCredentials: Credential): Observable<Credential> {
    const url = `http://localhost:3000/credentials?username=${enteredCredentials.username}`;
    return this._http.get<Credential>(url).pipe(retry(1), catchError(() => {
      return throwError('Error fetching credentials');
    }));
  }
}
