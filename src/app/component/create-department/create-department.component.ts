import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Department } from '../../model/department.model';
import { StandardResponse } from '../../model/standardresponse.model';
import { DepartmentService } from '../../service/DepartmentService';

@Component({
    selector: 'create-department',
    templateUrl: 'create-department.component.html',
    styleUrls: ['create-department.component.css']
})
export class CreateDepartmentComponent {
    departmentForm: FormGroup;
	//departmentName: FormControl;
	//departmentId: FormControl;
	//departmentIdToUpdate: number;
	//isUpdate = false;
	//isCreate = false;
	statusCode: number;
	requestProcessing = false;
	processValidation = false;
	//departmentDescriptionReceived: string = "department Description";

	standardResponse = new StandardResponse();

	//Create constructor to get service instance
	constructor(private departmentService: DepartmentService, private router: Router) {
		//Create form
		this.departmentForm = new FormGroup({
			departmentName: new FormControl('', Validators.required),
			departmentDescription: new FormControl('', Validators.required),
		});
	}

	ngOnInit():  void  {
    
	}

	preProccessConfigurations() {
		this.statusCode = null;
		this.requestProcessing = true;
	}

	//Handle create department
	onDepartmentFormSubmit() {
		this.processValidation = true;
		if (this.departmentForm.invalid) {
			return;
		}
		//Form is valid, now perform create
		//this.preProccessConfigurations();
		let departmentName = this.departmentForm.get('departmentName').value.trim();
		let departmentDescription = this.departmentForm.get('departmentDescription').value.trim();

		//Handle create department
		let department = new Department();
		department.departmentName = departmentName;
		department.departmentDescription = departmentDescription;
		this.departmentService.createDepartment(department)
			.subscribe(successCode => {
				this.standardResponse = successCode;
				this.router.navigate(['./department']);
				location.reload();
			},
			errorCode => this.statusCode = errorCode);
	}

}