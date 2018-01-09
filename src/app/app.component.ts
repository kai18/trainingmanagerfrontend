import { Component } from '@angular/core';
import { AuthorizeService } from './service/AuthorizeService.service';
import { Router } from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  jwtHelper: JwtHelper = new JwtHelper();

	constructor(private router: Router , private authorizeService: AuthorizeService) {

	}

	ngOnInit(): void {
		console.log("App entry point");
		if (this.authorizeService.getRefreshTokenExpirationDate()) {
			this.navigateToUserProfile();
		} else {
			this.logout();
		}
	}

	/* getRefreshTokenExpirationDate() {
		var token = localStorage.getItem('jwttoken');
		console.log("App entry point: token : " + token);
		if (token) {
		  let tokenExpDate = this.jwtHelper.getTokenExpirationDate(token);
		  let sessionExpDate = new Date(tokenExpDate.getTime() + 4*60000);
		  if (new Date() > sessionExpDate) {
			this.logout();
		  } else {
			  this.navigateToUserProfile();
		  }
		  return sessionExpDate;
		}

		this.logout();
	 }*/

	logout() {
		localStorage.removeItem('jwttoken');
		localStorage.removeItem('decodedtoken');
		this.router.navigate(['login']);
	}

	navigateToUserProfile() {
		let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		let userId: string = decodevalue.jti;
		this.router.navigate(['user/' + userId]);

	}
}
