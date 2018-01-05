import { StandardResponse } from './../model/standardresponse.model';
import { AppConfig } from './../model/appconfig.model';
import { Role } from '../model/role.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoleService {
  private headers = new HttpHeaders({'Content-Type' : 'application/json'});

  // Create constructor to get Http instance
  constructor(private http: HttpClient) {
  }

  // Fetch all roles
  getAllRoles(): Observable<StandardResponse> {
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.get<StandardResponse>(AppConfig.ROLE_URL)
      .catch(this.handleError);
  }

  getAllDepartments(): Observable<StandardResponse> {
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.get<StandardResponse>(AppConfig.DEPARTMENT_URL)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    const errorBody = error.json();
    // console.error("error : " + errorBody);
    return Observable.throw(errorBody || error);
  }

  // Add a role
  createRole(role: Role): Observable<StandardResponse> {
    // const token = localStorage.getItem('jwttoken');
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post<StandardResponse>(AppConfig.ROLE_URL, role)
      .catch(this.handleError);
  }

  // Add a role
  updateRole(role: Role): Observable<StandardResponse> {
    // const token = localStorage.getItem('jwttoken');
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.put<StandardResponse>(AppConfig.ROLE_URL, role)
      .catch(this.handleError);
  }

  // Delete role
  deleteRoleById(role: Role): Observable<StandardResponse> {
    const param = new HttpParams().set('roleId', role.roleId);
    // const token = localStorage.getItem('jwttoken');
    // const headers = new Headers({ 'Content-Type': 'application/json', 'jwtToken': token });
    // const options = new RequestOptions({ headers: headers });
    return this.http.delete<StandardResponse>(AppConfig.ROLE_URL, {params: param})
      .catch(this.handleError);
  }
}
