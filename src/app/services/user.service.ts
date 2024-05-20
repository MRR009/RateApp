// import { Injectable } from '@angular/core';
// import { Observable, catchError, throwError } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { UserLogin } from '../user/signup/usermodel.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   mainUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user';
//   baseUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user/allroles'

//   constructor(private http: HttpClient) { }

//   createUser(userDto: any): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post<any>(`${this.mainUrl}/Register`, userDto, { headers });
//   }

//   createUserWithFile(file: File, user: string): Observable<any> {
//     const formData: FormData = new FormData();
//     formData.append('file', file);
//     formData.append('user', user);
//     return this.http.post<any>(`${this.mainUrl}/create`, formData);
//   }

//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(this.mainUrl);
//   }

  
//   getAllRoles(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }

//   updateUser(userId: number, userAdminDto: any): Observable<any> {
//     return this.http.patch<any>(`${this.mainUrl}/${userId}`, userAdminDto);
//   }

//   updateUserRole(userId: number, roleId: number): Observable<any> {
//     const url = `${this.mainUrl}/user/${userId}/role/${roleId}`;
//     return this.http.patch<any>(url, {});
//   }



//   deleteUser(userId: number): Observable<any> {
//     return this.http.delete<any>(`${this.mainUrl}?userId=${userId}`);
//   }


  
//   loginUser(userLogin: UserLogin): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post<any>(`${this.mainUrl}/signin`, userLogin, { headers })
//       .pipe(
//         catchError(error => {
//           console.error('Error logging in:', error);
//           return throwError('Incorrect email or password');
//         })
//       );}
// }


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserLogin } from '../user/signup/usermodel.component';
import { Role } from '../userprofileform/rolemodel.component';
import { User } from '../allusers/allusersmodel.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  mainUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user';
  baseUrl = 'http://localhost:1014/stg/project.new_rate_index/api/user/allroles';
  rolesUrl = 'http://localhost:1014/stg/project.new_rate_index/api/roles/roles'

  constructor(private http: HttpClient) { }

  createUser(userDto: any): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/Register`, userDto);
  }

  createUserWithFile(file: File, user: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('user', user);
    return this.http.post<any>(`${this.mainUrl}/create`, formData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.mainUrl);
  }
  getAllUserProfiles(): Observable<User[]> {
    return this.http.get<User[]>(this.mainUrl);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }

  updateUser(userId: number, userAdminDto: any): Observable<any> {
    return this.http.patch<any>(`${this.mainUrl}/${userId}`, userAdminDto);
  }

  updateUserRole(userId: number, roleId: number): Observable<any> {
    const url = `${this.mainUrl}/user/${userId}/role/${roleId}`;
    return this.http.patch<any>(url, {});
  }

  updateUser1(userId: number, userAdminDto: any): Observable<any> {
    // const url = `${this.mainUrl}?userId=${userId}`;
    const url = `${this.mainUrl}/id?userId=${userId}`;
    return this.http.patch<any>(url, userAdminDto);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.mainUrl}?userId=${userId}`);
  }
  deleteUser1(userId: number): Observable<any> {
    const url = `${this.mainUrl}?userId=${userId}`;
    return this.http.delete<any>(url);
  }

  loginUser(userLogin: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/signin`, userLogin);
  }
//   getAllUserProfiles1(): Observable<User[]> {
//     return this.http.patch<User[]>(`${this.mainUrl}`);
//   }
 }

