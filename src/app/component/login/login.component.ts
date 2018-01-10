import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../model/user.model';
import { Address } from '../../model/address.model';
import { StandardResponse } from '../../model/standardresponse.model';
import { UserService } from '../../service/UserService.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  user = new User();
  address = new Address();
  standardResponse = new StandardResponse();
  emailId: string;
  password: string;
  firstFormGroup: FormGroup;
  errorMessage: string;
  modalErrorMessage: string;

  showModal = false;


  constructor(private http: HttpClient, private router: Router, private _formBuilder: FormBuilder,
    private userService: UserService, private jwtHelper: JwtHelper) { }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const emailId = this.firstFormGroup.get('emailId').value.trim();
    const password = this.firstFormGroup.get('password').value.trim();

    this.user.emailId = emailId;
    this.user.password = password;

    this.userService.login(this.user)
      .subscribe(standardResponse => {
        this.standardResponse = standardResponse;
        if (this.standardResponse != null && this.standardResponse.status === 'SUCCESS') {
          console.log(standardResponse.element.jwtToken)
          const decodedToken = this.jwtHelper.decodeToken(standardResponse.element.jwtToken);
          localStorage.setItem('jwt-token', standardResponse.element.jwtToken);
          localStorage.setItem('decodedtoken', JSON.stringify(decodedToken));
          localStorage.setItem('isLoggedIn', 'true');
          const value: string = localStorage.getItem('jwt-token')
          const decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
          this.redirectToUserProfile(decodevalue.jti);
          console.log('decoded token: ' + JSON.stringify(decodevalue.departments));
          console.log('1 : ' + standardResponse.element.jwttoken);
          console.log('2 : ' + value);
          console.log('3 : ' + decodevalue);
          console.log(JSON.stringify(decodevalue.privileges));
        } else {
          console.log(this.standardResponse.message);
        }
      },
      error => {
        this.errorMessage = <string>error.message;
      });
  }

  redirectToUserProfile(id: string) {
    this.router.navigate(['userprofile'], { queryParams: { userId: id } });
  }
}
