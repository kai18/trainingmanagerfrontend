import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthorizeService {
	jwtHelper: JwtHelper = new JwtHelper();

	getRefreshTokenExpirationDate(): boolean {
		var token = localStorage.getItem('jwt-token');
		console.log("App entry point: token : " + token);
		if (token) {
			let tokenExpDate = this.jwtHelper.getTokenExpirationDate(token);
			let sessionExpDate = new Date(tokenExpDate.getTime() + 4 * 60000);
			if (new Date() > sessionExpDate) {
				return false;
			} else {
				return true;
			}
		}
		return false;
	}
}