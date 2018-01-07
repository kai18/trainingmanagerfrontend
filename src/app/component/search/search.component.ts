import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';


import{PageEvent} from'@angular/material';

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import'rxjs/add/operator/distinct';
import'rxjs/add/observable/of';
import'rxjs/add/operator/catch';
import'rxjs/add/operator/debounceTime';
import'rxjs/add/operator/distinctUntilChanged';
import'rxjs/add/operator/switchMap';

import {UserService} from '../../service/UserService.service';
import{RoleService} from '../../service/RoleService.service';
import{DepartmentService} from '../../service/DepartmentService';
import {UserSearch} from '../../model/usersearch.model';
import {AppConfig} from '../../model/appconfig.model';
import {StandardResponse} from '../../model/standardresponse.model';
import {Address} from '../../model/address.model';
import {Role} from '../../model/role.model';
import {Department} from '../../model/department.model';



@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

@Injectable()
export class Search implements OnInit{

	private pageEvent: PageEvent;
	private searchTerms = new Subject<HttpParams>();
	private searchResponsePlain: StandardResponse;
	searchResponse: Observable<StandardResponse>;
	searchResults: UserSearch[];
	message: string
	allRoles: Role[];
	allDepartments: Department[];
	searchedOnce = false;

	pageSizeOptions = [3, 9, 12, 15];

	pagedUser: UserSearch[];
	pageSize = 3;
	pageLength = 0;

	constructor(private http: HttpClient, private userService: UserService, private roleService: RoleService,
				 private departmentService: DepartmentService, private router: Router)
	{}

	public search(firstName, lastName, email, departments, roles)
	{
		let params = this.addSearchParameters(firstName, lastName, email, departments, roles);

		this.searchTerms.next(params);
		this.searchResponse.subscribe(response => {this.searchResponsePlain  = response;
												   this.searchResults = this.searchResponsePlain.element;
												   this.message = this.searchResponsePlain.message;
												   this.pageLength = this.searchResults.length;
												   this.searchedOnce = true;
												   console.log(this.pageLength)});		
	}

	private validateField(field: any): boolean
	{
		if(field != null && field != undefined && field.length > 0)
			return true
		else
			return false;
	}

	public addSearchParameters(firstName, lastName, email, departments, roles): HttpParams{
		let params = new HttpParams();
		if(this.validateField(firstName))
		{
			params = params.set('firstName', firstName);
			console.log("Added firstName", firstName);
			console.log(params.get('firstName'))
		}
		if(this.validateField(lastName))
			params = params.set('lastName', lastName);
		if(this.validateField(email))
			params = params.set('email', email);
		if(this.validateField(departments))
			params = params.set('departments', departments);
		if(this.validateField(roles))
			params = params.set('roles', roles);
		return params;
	}

	public pageEventTrigger($event: PageEvent){
		this.pageSize = $event.pageSize;
		if(this.searchedOnce)
			this.pagedUser = this.searchResults.slice($event.pageIndex*this.pageSize, this.pageSize*($event.pageIndex+1));
		console.log(this.pagedUser);
	}

	public visitUser(id: string){
		this.router.navigate(['userprofile'], { queryParams: { userId: id } });
	}

	public deleteUser(userId: string){
		this.userService.delete(userId).subscribe(response => {console.log(response.message)}, response=> {console.log(response.message)});
	}

	ngOnInit(): void{
		this.searchResponse = this.searchTerms
							.debounceTime(500)
							.distinctUntilChanged()
							.switchMap(params => params
								? this.userService.searchNext(params)
								: Observable.of<StandardResponse>())
								.catch(error => {
								console.log(error)
								console.log(this.searchResponse)
								return Observable.of<StandardResponse>()
							});
		this.searchResponse.subscribe(response => {this.searchResponsePlain  = response;
													this.searchResults = this.searchResponsePlain.element;
													this.pageLength = this.searchResults.length;
												   	console.log(this.pageLength);
												   	this.pagedUser = this.searchResults.slice(0, this.pageSizeOptions[0]);
													this.searchedOnce = true;});
		
		this.roleService.getAllRoles().subscribe(response=> {this.allRoles = response.element});
		this.departmentService.getAllDepartments().subscribe(response => {this.allDepartments = response.element});
	}
}
