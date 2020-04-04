import { retry, catchError } from 'rxjs/operators';
import { Credential } from '../entities/credential';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  fetchCredentials(): Observable<Credential> {
    return this._http.get<Credential>(this.localUrl).pipe(retry(1), catchError(() => {
      return throwError('Error fetching credentials.json');
    }));
  }
}
