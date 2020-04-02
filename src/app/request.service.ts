import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  localUrl = './assets/requests.json';
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  fetchRequests = (): Observable<Request> => {
    return this._http.get<Request>(this.localUrl).pipe(retry(1), catchError(() => {
      return throwError('Error Reading requests.json');
    }));
  }
}
