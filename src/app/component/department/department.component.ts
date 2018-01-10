import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { DepartmentService } from '../../service/DepartmentService';
import { Department } from '../../model/department.model';
import { StandardResponse } from "../../model/standardresponse.model";
import { DeleteModalComponent } from './../delete-modal/delete-modal.component';


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
  departmentToDelete: Department;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  standardResponse = new StandardResponse();
  errorResponse = new StandardResponse();

  // Create constructor to get service instance
  constructor(private departmentService: DepartmentService, private dialog: MatDialog, public snackBar: MatSnackBar) {
    // creating update form
    this.departmentUpdateForm = new FormGroup({
      departmentId: new FormControl({ disabled: true }),
      departmentName: new FormControl('', Validators.required),
      departmentDescription: new FormControl('', Validators.required),
    });
  }


  // Create ngOnInit() and load articles
  ngOnInit(): void {
    this.getAllDepartments();
  }

  // Fetch all articles
  getAllDepartments() {
    this.departmentService.getAllDepartments()

      .subscribe(
      data => this.allDepartments = data.element,
      errorCode => this.statusCode = errorCode);
  }

  onUpdateClick(departmentToUpdate: Department) {
    if (this.toUpdate) {
      this.toUpdate = false;
    } else {
      this.toUpdate = true;
    }

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
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform update
    this.preProcessConfigurations();

    // department is set with values of clicked department
    const departmentName = this.departmentUpdateForm.get('departmentName').value.trim();
    const departmentDescription = this.departmentUpdateForm.get('departmentDescription').value.trim();

    const department = new Department();
    department.departmentId = this.departmentToUpdate.departmentId;
    department.departmentName = departmentName;
    department.departmentDescription = departmentDescription;

    this.departmentService.updateDepartment(department)
      .subscribe(successCode => {
        this.standardResponse = successCode;
        this.getAllDepartments();
        this.openSnackBar(this.standardResponse.message, 'Ok');
      },
      errorCode => {
        this.errorResponse = errorCode;
        this.openSnackBar(this.errorResponse.message, 'Ok');
      });
    this.toUpdate = false;
  }

  deleteDepartment(departmentId: string) {
    this.departmentService.deleteDepartment(departmentId)
      .subscribe(successCode => {
        this.standardResponse = successCode;
        this.getAllDepartments();
        this.openSnackBar(this.standardResponse.message, 'Ok');
      },
      errorCode => {
        this.statusCode = errorCode;
        this.openSnackBar(this.errorResponse.message, 'Ok');
      });
    this.getAllDepartments();
  }

  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  openDepartmentDeleteDialog(department?) {
    this.departmentToDelete = department;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      hasBackdrop: true,
      data: {
        entity: 'Department',
        message: department.departmentName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDepartment(this.departmentToDelete.departmentId);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

}
