import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';

import { StandardResponse } from '../../model/standardresponse.model';
import { Address } from '../../model/address.model';
import { User } from '../../model/user.model';
import {Department} from '../../model/department.model';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../service/UserService.service';
import {DepartmentService} from '../../service/DepartmentService';
import {PrivilegeCheckerService} from '../../service/privilegechecker.service'

import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import {Inject} from '@angular/core';

import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material'

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { NgForm } from '@angular/forms/src/directives/ng_form';

import {Role} from '../../model/role.model';

@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})

export class UserProfile {
 
  private user = new User();
  private availableRoles = new Array<Role>();
  private presentRoles = new Array<Role>();
  
  private presentDepartments = new Array<Department>();
  private availableDepartments = new Array<Department>();

  private deptArray: Array<number>;
  private standardResponse = new StandardResponse();
  private errorMessage: string;
  private sub: string;
  private showProfile: boolean;
  private updateProfile: boolean;
  private address = new Address();
  private isUpdate = false;
  private first = true;
  private last = true;
  private  phone = true;
  private zip = true;
  private door = true;
  private street = true;
  private area1 = true;
  private city1 = true;
  private state1 = true;
  private country1 = true;

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';




  constructor(private userService: UserService, private departmentService: DepartmentService, 
    private router: Router, private actRoute: ActivatedRoute, public snackBar: MatSnackBar,
     private privilegeChecker: PrivilegeCheckerService) {

  }

  private validateFirstName(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z]+$');
    this.first = regexp.test(field);
    console.log(this.first + " inside firstName validation")
    return this.first;
  }

  private validateLastName(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z]+$');
    this.last = regexp.test(field);
    console.log(this.last + " inside lastName validation")
    return this.last;
  }

  private validatePhoneNumberField(field: string): boolean {
    let regexp = new RegExp('^[0-9]*$');
    this.phone = regexp.test(field);
    console.log(this.phone + " inside phonenumber validation")
    if (field != null && field.length == 10 && this.phone)
      return true
    else
      console.log("phone number not valid")
    this.phone = false;
    return false
  }

  private validateDoorNumber(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z0-9\\-\\s]+$');
    this.door = regexp.test(field);
    console.log(this.door + " inside door validation")
    return this.door;
  }
  private validateStreetName(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z0-9\\-\\s]+$');
    this.street = regexp.test(field);
    console.log(this.street + " inside street validation")
    return this.street;
  }

  private validateArea(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z0-9\\-\\s]+$');
    this.area1 = regexp.test(field);
    console.log(this.area1 + " inside area validation")
    return this.area1;
  }
  private validateCity(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z\\-\\s]+$');
    this.city1 = regexp.test(field);
    console.log(this.city1 + " inside city validation")
    return this.city1;
  }

  private validateState(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z\\-\\s]+$');
    this.state1 = regexp.test(field);
    console.log(this.state1 + " inside state validation")
    return this.state1;
  }

  private validateCountry(field: string): boolean {
    let regexp = new RegExp('^[a-zA-Z\\-\\s]+$');
    this.country1 = regexp.test(field);
    console.log(this.country1 + " inside country validation")
    return this.country1;
  }

  private validateZipCode(field: string): boolean {
    let regexp = new RegExp('^[0-9]*$');
    this.zip = regexp.test(field);
    console.log(this.zip + " inside zip validation")
    if (field != null && field.length == 6 && this.zip)
      return true
    else
      console.log("zipCode not valid")
    this.zip = false;
    return false
  }


  ngOnInit(): void {
    this.showProfile = true;
    this.updateProfile = false;
    this.sub = this.actRoute.snapshot.queryParams['userId'];
    console.log(this.sub)
    this.user.id = this.sub;
    let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
    this.fetchUser();
  }

  fetchUser(): void {
    console.log("inside fetch");
    this.userService.getUserById(this.sub)
      .subscribe(standardResponse => {
        this.standardResponse = standardResponse;
        this.showProfile = true;
        this.user = this.standardResponse.element;
        this.address = this.user.address;
        if (this.user.roles != null) {
            this.user.roles.forEach(e => { this.presentRoles.push(e); });
        } 
        
        if(this.user.departments != null)
          this.user.departments.forEach(department => {this.presentDepartments.push(department)});
        this.departmentService.getAllDepartments().subscribe(response => {
          if(response.element != null){
            this.availableDepartments = response.element;
            this.presentDepartments.forEach(presentDepartment => {
              this.availableDepartments.splice(this.availableDepartments.indexOf(presentDepartment), 1);
            })
          }
        });

        console.log(this.user);
        this.getRoleByDepartments(this.user.id); 
        
      }, error=>{this.openSnackBar(error.error.message, "ok")}
  }
  updateToggle() {
    console.log("toggle clicked!!")
    if (this.isUpdate)
      this.isUpdate = false;
    else
      this.isUpdate = true;

  }

  onSubmit(): void {
    if (this.validateFirstName(this.user.firstName) && this.validateLastName(this.user.lastName)
      && this.validatePhoneNumberField(this.user.phoneNumber) && this.validateDoorNumber(this.address.doorNumber)
      && this.validateStreetName(this.address.streetName) && this.validateArea(this.address.area) && this.validateCity(this.address.city)
      && this.validateState(this.address.state) && this.validateCountry(this.address.country) && this.validateZipCode(this.address.zipcode)) {
      console.log("update from component");
      this.user.isActive = true;
      this.user.address = this.address;
    
      this.userService.update(this.user)
        .subscribe(standardResponse => {
          this.standardResponse = standardResponse;
          this.isUpdate = false;
          this.showProfile = true;
          //location.reload();
          //this.fetchUser();
          this.openSnackBar(standardResponse.message, 'ok');
        }, error=>{this.openSnackBar(error.error.message, "ok")}
    }
    else {
      console.log("form inappropriate");
    }
  }

  public getRoleByDepartments(userId: string): void {
        this.userService.getRoleByDepartments(userId)
            .subscribe(standardResponse => {
                 console.log("fetched roles")
                this.standardResponse = standardResponse;
                if (this.standardResponse.element != null) {
                    this.availableRoles = this.standardResponse.element;
                }
            }, error=>{this.openSnackBar(error.error.message, "ok")});
    }

    public grantRoleToUser(userId: string, role: Role): void {

        this.userService.granteRoleToUser(userId, role.roleId)
            .subscribe(standardResponse => {
                this.standardResponse = standardResponse;
                if (this.standardResponse != null && this.standardResponse.status == 'success') {
                    this.presentRoles.push(role);
                    this.availableRoles.splice(this.availableRoles.indexOf(role), 1);

                }
                this.openSnackBar(standardResponse.message, 'ok');
            }, error=>{this.openSnackBar(error.error.message, "ok")});

    }
    ///changed
    public revokeRoleToUser(userId: string, role: Role): void {
        this.userService.revokeRoleToUser(userId, role.roleId)
            .subscribe(standardResponse => {
                this.standardResponse = standardResponse;
                if (this.standardResponse != null && this.standardResponse.status == 'success') {
                    this.availableRoles.push(role);
                    this.presentRoles.splice(this.presentRoles.indexOf(role), 1);
                }
                this.openSnackBar(standardResponse.message, 'ok');
            }, error=>{this.openSnackBar(error.error.message, "ok")});
    } 

    public allotDepartment(userId: string, department: Department){
       this.userService.allotDepartmentToUser(userId, department.departmentId).subscribe(response => {
         if(response.status == 'success'){
           this.presentDepartments.push(department);
           this.presentDepartments.forEach(presentDepartment => {
              this.availableDepartments.splice(this.availableDepartments.indexOf(presentDepartment), 1);
              console.log(JSON.stringify(this.availableDepartments));
            })
         }
         this.openSnackBar(response.message, 'ok');
       }, error=>{
           console.log(JSON.stringify(error));
           this.openSnackBar(error.error.message, "ok")})
    }

    public revokeDepartment(userId: string, department: Department){
       this.userService.revokeDepartmentFromUser(userId, department.departmentId).subscribe(response => {
         if(response.status == 'success'){
           this.availableDepartments.push(department);
           this.availableDepartments.forEach(availableDepartment => {
              this.presentDepartments.splice(this.presentDepartments.indexOf(availableDepartment), 1);
              console.log(JSON.stringify(this.presentDepartments)
            });
         }
         this.openSnackBar(response.message, 'ok');
       }, error=>{this.openSnackBar(error.error.message, "ok")});
    }

    public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }    
}

