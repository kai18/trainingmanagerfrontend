import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DepartmentService } from '../../service/DepartmentService';
import { Department } from '../../model/department.model';
import { StandardResponse} from "../../model/standardresponse.model";



@Component({
    selector: 'department',
    templateUrl: 'department.component.html',
    styleUrls: ['department.component.css']
})
export class DepartmentComponent {

	allDepartments: Department[];
//	departmentToUpdate = new Department();
//	departmentIdToUpdate: number;
//	departmentUpdateForm: FormGroup;
//	departmentId: FormControl;
//	departmentName: FormControl;
//	departmentDescription: FormControl;
//	departmentDescriptionReceived: string = "Department description";
//	departmentToDelete: number;

	standardResponse = new StandardResponse();
	errorResponse = new StandardResponse();
	statusCode: number;
	requestProcessing = false;
	processValidation = false;
//	toUpdate = false;
//	deptFlag: boolean = false;

	//userId: number;
	//previleges: Previleges[];

	//Create constructor to get service instance
	constructor(private departmentService: DepartmentService ) {
		//creating update form
	/*	this.departmentUpdateForm = new FormGroup({
			departmentId: new FormControl({ disabled: true }),
			departmentName: new FormControl('', Validators.required),
			departmentDescription: new FormControl('', Validators.required),
		});*/
	}


	//Create ngOnInit() and load articles
	ngOnInit(): void {
        this.getAllDepartments();
	}

	//Fetch all articles
	getAllDepartments() {
		this.departmentService.getAllDepartments()
			.subscribe(
			data => this.allDepartments = data.element,
			errorCode => this.statusCode = errorCode);
	}

 //Perform preliminary processing configurations
   preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
 }
 
}