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
	// isLoggedIn: boolean;
	// userId: number;

	// constructor(private router: Router , private authorizeService: AuthorizeService) {

	// }

	// ngOnInit(): void {
	// 	let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
	// 	this.userId = decodevalue.jti;
	// 	if (this.authorizeService.getRefreshTokenExpirationDate()) {
	// 		this.isLoggedIn = true;
	// 	} else {
	// 		this.isLoggedIn = false;
	// 		this.logout();
	// 	}
		
	// }

	// logout() {
	// 	localStorage.removeItem('jwttoken');
	// 	localStorage.removeItem('decodedtoken');
	// 	this.router.navigate(['login']);
	// 	this.isLoggedIn = false;
	// }

	// navigateToUserProfile() {
	// 	let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
	// 	let userId: string = decodevalue.jti;
	// 	this.router.navigate(['user/' + userId]);
	// }
}