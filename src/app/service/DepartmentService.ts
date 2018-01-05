import { StandardResponse } from './../model/standardresponse.model';
import { AppConfig } from './../model/appconfig.model';
import { Department } from '../model/department.model';

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DepartmentService {

  // Create constructor to get Http instance
  constructor(private http: HttpClient) {
      
  }

    //Fetch all departments
    public  getAllDepartments(){
      return this.http.get<StandardResponse>(AppConfig.DEPARTMENT_URL);
    }

    //create new department
    public createDepartment(department: Department) {
      return this.http.post<StandardResponse>(AppConfig.DEPARTMENT_URL , department);
    }

    //Update department
    public updateDepartment(department:Department){
     return this.http.put<StandardResponse>(AppConfig.DEPARTMENT_URL , department);
    }

	  //Delete department
    public deleteDepartment(departmentId:string){
     return this.http.delete<StandardResponse>(AppConfig.DEPARTMENT_URL +"/"+ departmentId);
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