import { StandardResponse } from './../model/standardresponse.model';
import { AppConfig } from './../model/appconfig.model';
import { Department } from '../model/department.model';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepartmentService {

  // Create constructor to get Http instance
  constructor(private http: HttpClient) {
      
  }

    //Fetch all departments
    public getAllDepartments(): Observable<StandardResponse> {
    return this.http.get(AppConfig.DEPARTMENT_URL)
        .catch(this.handleError);
}

    //create new department
    public createDepartment(department: Department): Observable<StandardResponse> {
    
    return this.http.post(AppConfig.DEPARTMENT_URL , department)
        .catch(this.handleError);
}

	//Update department
	public updateDepartment(department: Department): Observable<StandardResponse> {
		return this.http.put(AppConfig.DEPARTMENT_URL , department)
			.map(this.extractData)
			.catch(this.handleError);
	}

	// //Delete department
	// deleteDepartment(department: Department): Observable<StandardResponse> {
  //   const headers = new Headers(); 
  //   headers.append('Content-Type', 'application/json; charset=utf-8'); headers.append('Access-Control-Allow-Origin', '*'); 
  //   const options = new RequestOptions({ headers: headers });
	// //	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  // //	let options = new RequestOptions({ headers: cpHeaders });
  
	// 	return this.http.delete(AppConfig.DEPARTMENT_URL +"/"+  department)
	// 		//.map(this.extractData)
	// 		.catch(this.handleError);
	// }


  public deleteDepartment(departmentId: string): Observable<StandardResponse> {
    
    return this.http.delete(AppConfig.DEPARTMENT_URL +"/"+ departmentId)
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
}