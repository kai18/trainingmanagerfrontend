import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {Response} from '@angular/http';
//import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import { User } from '../../model/user.model';
import { Role } from '../../model/role.model';
import { Department } from '../../model/department.model';
import { Address } from '../../model/address.model';
import { StandardResponse } from '../../model/standardresponse.model';
import { UserService } from '../../service/UserService.service';
import { DepartmentService } from '../../service/DepartmentService';
import { RoleService } from '../../service/RoleService.service';
import { Router } from '@angular/router';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})

export class Register
{

  allDepartments: Department[];
  allBasicRoles= new Array<Role>();
  allRoles= new Array<Role>();
  user = new User();
  address = new Address();
  standardResponse = new StandardResponse();

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  titleAlert:string = 'This field is required';

  firstName: string
  lastName:string
  emailId: string
  password:string
  gender:string
  doorNumber:string
  streetName:string
  area:string
  country:string
  state:string
  zipcode:string
  city: string
  role = new Role();
  department = new Department();
  rolesArray = new Array<Role>();
  departmentsArray = new Array<Department>();

  statusCode: number;
  errorMessage: String;
  passwordInvalid= false

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

  constructor(private router: Router, private _formBuilder: FormBuilder, private userService: UserService, private departmentService: DepartmentService, private roleService: RoleService) { }


  ngOnInit() {
    this.getAllDepartments();
    this.getAllRoles();
    //this.getAllBasicRoles();

   this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
    });
    this.secondFormGroup = this._formBuilder.group({
      doorNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      area: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      city: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      department: [''],
      role: ['']
    });

  }

  getAllDepartments() {
    this.departmentService.getAllDepartments()
      .subscribe(
      data => this.allDepartments = data.element,
      errorCode => this.statusCode = errorCode);
  }

  getAllRoles(){
    this.roleService.getAllRoles()
     .subscribe(standardResponse => {
        console.log("hello");
        this.standardResponse = standardResponse;
        this.allRoles = this.standardResponse.element;
        this.getAllBasicRoles();
      },
      error => this.errorMessage = <any>error);
  }

  getAllBasicRoles(){
    for(let all of this.allRoles)
    {
      if(all.roleName=='Faculty' || all.roleName=='Student')
        this.allBasicRoles.push(all);
    }
  }

  onDetailsSubmit():void{
     let firstName = this.firstFormGroup.get('firstName').value.trim();
     let lastName = this.firstFormGroup.get('lastName').value.trim();
     let emailId = this.firstFormGroup.get('emailId').value.trim();
     let password = this.firstFormGroup.get('password').value.trim();
     let cpassword = this.firstFormGroup.get('cpassword').value.trim();
     let gender = this.firstFormGroup.get('gender').value.trim();
     let phoneNumber = this.firstFormGroup.get('phoneNumber').value.trim();

     this.user.firstName=firstName;
     this.user.lastName=lastName;
     this.user.emailId = emailId;
     this.user.password = password
     this.user.gender = gender
     this.user.phoneNumber = phoneNumber
  }

  onAddressSubmit():void{
    let doorNumber = this.secondFormGroup.get('doorNumber').value.trim();
    let streetName = this.secondFormGroup.get('streetName').value.trim();
    let area = this.secondFormGroup.get('area').value.trim();
    let city = this.secondFormGroup.get('city').value.trim();
    let country = this.secondFormGroup.get('country').value.trim();
    let state = this.secondFormGroup.get('state').value.trim();
    let zipcode = this.secondFormGroup.get('zipcode').value.trim();

    this.address.doorNumber = doorNumber;
    this.address.streetName = streetName
    this.address.area = area
    this.address.city =  city
    this.address.country = country
    this.address.state = state
    this.address.zipcode = zipcode
  }

  validatePassword(password, cpassword):void{
    if(password!==cpassword){
      this.passwordInvalid= true;
      this.isLinear = true;
    }

    else this.passwordInvalid= false
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

register(): void {
  if (this.validateFirstName(this.user.firstName) && this.validateLastName(this.user.lastName)
      && this.validatePhoneNumberField(this.user.phoneNumber) && this.validateDoorNumber(this.address.doorNumber)
      && this.validateStreetName(this.address.streetName) && this.validateArea(this.address.area) && this.validateCity(this.address.city)
      && this.validateState(this.address.state) && this.validateCountry(this.address.country) && this.validateZipCode(this.address.zipcode)) {
      
    console.log("sjhdj")
  
      let departmentFront = this.thirdFormGroup.get('department').value;
      let roleFront = this.thirdFormGroup.get('role').value;

      this.user.isActive = true;
      this.user.address = this.address;

      this.rolesArray.push(roleFront);
      this.user.roles = this.rolesArray;

      this.departmentsArray.push(departmentFront);
      this.user.departments = this.departmentsArray;

      this.userService.register(this.user)
        .subscribe(standardResponse => this.standardResponse = standardResponse,
        error => this.errorMessage = <any>error);
      // this.router.navigate(['/login']);
    }
 
 //console.log('Test result : ' + this.standardResponse.status);
}
}
  