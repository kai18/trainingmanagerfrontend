import {Component, AfterViewInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {MatTableModule} from '@angular/material';

import { DepartmentService } from '../../service/DepartmentService';
import { Department } from '../../model/department.model';
import { ModalContent} from '../../model/modalContent.model';
import { StandardResponse} from "../../model/standardresponse.model";
import { ModalComponent } from '../modal/modal.component';


@Component({
    selector: 'department',
    templateUrl: 'department.component.html',
    styleUrls: ['department.component.css']
})


export class DepartmentComponent {

    allDepartments: Department[];
	departmentToUpdate = new Department();
	departmentUpdateForm: FormGroup;
	departmentId: FormControl;
	statusCode: number;
	requestProcessing = false;
	processValidation = false;
	toUpdate = false;

	standardResponse = new StandardResponse();
	errorResponse = new StandardResponse();
	
  
	//Create constructor to get service instance
	constructor(private departmentService: DepartmentService)  {
		//creating update form
		this.departmentUpdateForm = new FormGroup({
			departmentId: new FormControl({ disabled: true }),
			departmentName: new FormControl('', Validators.required),
			departmentDescription: new FormControl('', Validators.required),
		});
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

	onUpdateClick(departmentToUpdate: Department) {
		if (this.toUpdate)
			this.toUpdate = false;
		else
			this.toUpdate = true;

		this.departmentToUpdate.departmentId = departmentToUpdate.departmentId;
		this.departmentToUpdate.departmentName = departmentToUpdate.departmentName;
		this.departmentToUpdate.departmentDescription = departmentToUpdate.departmentDescription;

		this.departmentUpdateForm.setValue({
			departmentId: this.departmentToUpdate.departmentId,
			departmentName: this.departmentToUpdate.departmentName,
			departmentDescription: this.departmentToUpdate.departmentDescription
		})
	}

	onUpdateSubmit() {
		this.processValidation = true;
		if (this.departmentUpdateForm.invalid) {
			return; //Validation failed, exit from method.
		}
		//Form is valid, now perform update
		this.preProcessConfigurations();

		//department is set with values of clicked department
		let departmentName = this.departmentUpdateForm.get('departmentName').value.trim();
		let departmentDescription = this.departmentUpdateForm.get('departmentDescription').value.trim();

		let department = new Department();
		department.departmentId = this.departmentToUpdate.departmentId;
		department.departmentName = departmentName;
		department.departmentDescription = departmentDescription;

		this.departmentService.updateDepartment(department)
			.subscribe(successCode => {
				this.standardResponse = successCode;
				//this.getAllDepartments();
			},
			errorCode => {
				this.errorResponse = errorCode;
				alert(this.errorResponse.message);
			});
		this.toUpdate = false;
	}
	
    deleteDepartment(departmentId: string) {
		console.log("called")
		this.departmentService.deleteDepartment(departmentId)
			.subscribe(successCode => {
				console.log("invalid")
				this.standardResponse = successCode;
			//	this.getAllDepartments();
			},
			errorCode => {
				this.statusCode = errorCode;
				alert(this.errorResponse.message);
			});
			this.getAllDepartments();
	}
   
 //Perform preliminary processing configurations
   preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
 }
}