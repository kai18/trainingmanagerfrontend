import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { StandardResponse } from '../../model/standardresponse.model';
import { Address } from '../../model/address.model';
import { User } from '../../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/UserService.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import {Inject} from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})

export class UserProfile {
  //firstFormGroup: FormGroup;
  user = new User();
  //availableRoles = new Array<Role>();
  //roleAccessTempList = new Array<Role>();
  //availableRolesTemp = new Array<Role>();
  deptArray: Array<number>;
  standardResponse = new StandardResponse();
  errorMessage: string;
  sub: string;
  //loggedInUserId: number;
  showProfile: boolean;
  updateProfile: boolean;
  address = new Address();
  //previleges: Previleges[];
  isUpdate = false;
  // first = false;
  first = true;
  last = true;
  phone = true;
  zip = true;
  door = true;
  street = true;
  area1 = true;
  city1 = true;
  state1 = true;
  country1 = true;

  constructor(private userService: UserService, private router: Router, private actRoute: ActivatedRoute, ) {

  }

  // private validateField(field: string): boolean {
  //  if (field != null && field != undefined && field.length > 0)
  //    return true
  //  else
  //    return false;
  //   }
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
    this.user.userId = parseInt(this.sub);
    let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
    //this.loggedInUserId = decodevalue.jti;
    //this.previleges = decodevalue.previleges;
    console.log("starting");
    this.fetchUser();
  }

  fetchUser(): void {
    console.log("inside fetch");
    this.userService.getUserById(this.sub)
      .subscribe(standardResponse => {
        console.log("hello");
        this.standardResponse = standardResponse;
        this.showProfile = true;
        this.user = this.standardResponse.element;
        this.address = this.user.address;
        console.log(this.user);
        //this.getRoleByDepartments();
      },
      error => this.errorMessage = <any>error);
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
      //this.user.address.id = this.user.userId;
      //console.log(this.user.address.id = this.user.userId);
      //this.user.department = getDepartment(this.departments.departmentId);
      //this.user.role = getRole(this.role.roleId);
      this.userService.update(this.user)
        .subscribe(standardResponse => {
          this.standardResponse = standardResponse;
          this.isUpdate = false;
          this.showProfile = true;
          location.reload();
          //this.fetchUser();
        },
        error => this.errorMessage = <any>error);

      console.log('Test result : ' + this.standardResponse.status);
    }
    else {
      console.log("form inappropriate");
    }
  }
}

