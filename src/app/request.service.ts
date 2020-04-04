import { Request } from './entities/Request';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  localUrl = 'http://localhost:3000/requests';
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  fetchRequests = (): Observable<Request> => {
    return this._http.get<Request>(this.localUrl).pipe(retry(1), catchError(() => {
      return throwError('Error Reading requests.json');
    }));
  }
  fetchRequestWithId(requestId: number): Observable<Request> {
    const url = `http://localhost:3000/requests?requestId=${requestId}`;
    return this._http.get<Request>(url).pipe(retry(1), catchError(() => {
      return throwError('Error Fetching Request');
    }));
  }

  addNewRequest(newRequest: Request): Observable<Request> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    newRequest.id = 10;
    return this._http.post<Request>(this.localUrl, newRequest, httpOptions);
  }
}
