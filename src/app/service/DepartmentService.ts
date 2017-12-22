import { StandardResponse } from './../model/standardresponse.model';
import { AppConfig } from './../model/appconfig.model';
import { Department } from '../model/department.model';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepartmentService {

  // Create constructor to get Http instance
  constructor(private http: Http) {
  }

    //Fetch all departments
    getAllDepartments(): Observable<StandardResponse> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(AppConfig.DEPARTMENT_URL, options )
        .map(this.extractData)
        .catch(this.handleError);
}
/*
    //create new department
    createDepartment(department: Department): Observable<StandardResponse> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(AppConfig.DEPARTMENT_URL , department, options)
        .map(this.extractData)
        .catch(this.handleError);
}

	//Update department
	updateDepartment(department: Department): Observable<StandardResponse> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.put(AppConfig.DEPARTMENT_URL , department, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	//Delete department
	deleteDepartmentById(departmentId: string): Observable<StandardResponse> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(AppConfig.DEPARTMENT_URL + '/' + departmentId, options)
			.map(this.extractData)
			.catch(this.handleError);
	}
*/
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    const errorBody = error.json();
    // console.error("error : " + errorBody);
    return Observable.throw(errorBody || error);
  }
}