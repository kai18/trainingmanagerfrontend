import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../service/AuthorizeService.service';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})

export class Navbar
{
	isLoggedIn = false;
	userId: number;

	constructor(private router: Router , private authorizeService: AuthorizeService) {

	}

	ngOnInit(): void {
		// localStorage.removeItem('jwttoken');
		// localStorage.removeItem('decodedtoken');
		// localStorage.removeItem('isLoggedIn')
		let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		//this.isLoggedIn= JSON.parse(localStorage.getItem('isLoggedIn'));
		if(decodevalue){
		this.userId = decodevalue.jti;
		if (this.authorizeService.getRefreshTokenExpirationDate()) {
			this.isLoggedIn = true;
			//this.navigateToUserProfile();
		} else {
			this.isLoggedIn = false;
			this.logout();
		}
	}
		
	}

ngDoCheck(){
	let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
	this.isLoggedIn= JSON.parse(localStorage.getItem('isLoggedIn'));
}

	logout() {
		localStorage.removeItem('jwttoken');
		localStorage.removeItem('jwt-token');
		localStorage.removeItem('decodedtoken');
		localStorage.removeItem('isLoggedIn');
		this.router.navigate(['login']);
		this.isLoggedIn = false;
	}

	navigateToUserProfile() {
		let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		let userId: string = decodevalue.jti;
		this.router.navigate(['userprofile'], { queryParams: { userId: userId } });
	}
}