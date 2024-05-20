
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private baseUrl = 'http://localhost:1014/stg/project.new_rate_index/api/roles';
  private baseUrl1 = 'http://localhost:1014/stg/project.new_rate_index/api';

  private screenUrl='http://localhost:1014/stg/project.new_rate_index'

  constructor(private http: HttpClient) {}

createRole(userRoles: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.http.post<any>(this.baseUrl, JSON.stringify(userRoles), httpOptions)
    .pipe(catchError(this.handleError));
}

  
  getUserAccess(roleId: number): Observable<any[]> {
    const url = (this.baseUrl + `/access/{roleId}?roleId=${roleId}`);
    return this.http.get<any[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllScreens(): Observable<any[]> {
    const url = `${this.baseUrl}/screens1`;
    return this.http.get<any[]>(url)
      .pipe(catchError(this.handleError));
  }

  getRoles(): Observable<any[]> {
    const url = `${this.baseUrl}/roles`;
    return this.http.get<any[]>(url)
      .pipe(catchError(this.handleError));
  }

  createScreenAccess(roleId: number, userAccess: any[]): Observable<any[]> {
    const url = `${this.baseUrl}/screens`;
    return this.http.post<any[]>(url, { roleId, userAccess })
      .pipe(catchError(this.handleError));
  }

  createScreenAccess1(roleId: number, userAccess: any[]): Observable<any[]> {
  const baseUrl = 'http://localhost:1014/stg/project.new_rate_index/api';
  const url = `${baseUrl}/roles/screens?roleId=${roleId}`;
  return this.http.post<any[]>(url, userAccess)
    .pipe(catchError(this.handleError));
}


  updateScreenAccess(roleId: number, userAccess: any[]): Observable<any[]> {
    const url = `${this.baseUrl}/screens`;
    return this.http.put<any[]>(url, { roleId, userAccess })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}

