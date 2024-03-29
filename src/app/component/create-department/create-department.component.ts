import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
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
	statusCode: number;
	requestProcessing = false;
	processValidation = false;
	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	standardResponse = new StandardResponse();
	errorResponse = new StandardResponse();

	//Create constructor to get service instance
	constructor(private departmentService: DepartmentService, private router: Router,public snackBar: MatSnackBar) {
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
				this.openSnackBar(this.standardResponse.message, 'Ok');
				//location.reload();
			},
			errorCode => {
				this.statusCode = errorCode;
				this.openSnackBar(this.errorResponse.message, 'Ok');
			});
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 4000,
		  horizontalPosition : this.horizontalPosition,
		  verticalPosition : this.verticalPosition
		});
	}
}