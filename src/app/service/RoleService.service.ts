import { StandardResponse } from './../model/standardresponse.model';
import { AppConfig } from './../model/appconfig.model';
import { Role } from '../model/role.model';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoleService {

  // Create constructor to get Http instance
  constructor(private http: Http) {
  }

  // Fetch all roles
  getAllRoles(): Observable<StandardResponse> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(AppConfig.ROLE_URL, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
