import { retry, catchError } from 'rxjs/operators';
import { Employee } from './entities/Employee';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }
  fetchEmployeeWithUsername(username: string): Observable<Employee> {
    const url = `http://localhost:3000/employees?username=${username}`;
    return this._http.get<Employee>(url).pipe(retry(1), catchError(() => {
      return throwError('Error fetching employee details');
    }));
  }
}
