import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri: string = 'http://localhost:5000/api/employee';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'basic bWVhbjoxMjM0');

  constructor(private http: HttpClient) { }

  //Creates an employee at db
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}`;
    return this.http.post(url, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  //Gets all employees data
  getEmployees() {
    return this.http.get(`${this.baseUri}`, { headers: this.headers });
  }

  //Gets data from a specific employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Updates an specific employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Delete an specific employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}