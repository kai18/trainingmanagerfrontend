import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Response} from '@angular/http';


import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import'rxjs/add/operator/distinct';
import'rxjs/add/observable/of';
import'rxjs/add/operator/catch';
import'rxjs/add/operator/debounceTime';
import'rxjs/add/operator/distinctUntilChanged';
import'rxjs/add/operator/switchMap';


import {UserSearch} from '../../model/usersearch.model';
import {AppConfig} from '../../model/appconfig.model';
import {StandardResponse} from '../../model/standardresponse.model';
@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

@Injectable()
export class Search implements OnInit{

	private searchTerms = new Subject<HttpParams>();
	private searchResponsePlain: StandardResponse;
	searchResponse: Observable<StandardResponse>;
	constructor(private http: HttpClient)
	{
		this.searchResponse = this.searchTerms
							.debounceTime(1000)
							.distinctUntilChanged()
							.switchMap(params => params
								? this.searchNext(params)
								: Observable.of<StandardResponse>())
								.catch(error => {
								console.log(error)
								console.log(this.searchResponse)
								return Observable.of<StandardResponse>()
							});
		this.searchResponse.subscribe(response => this.searchResponsePlain);
	}

	public search(firstName, lastName, email, departments, roles)
	{
		let params = this.addSearchParameters(firstName, lastName, email, departments, roles);
		console.log(params.getAll('firstName'));
		//console.log(firstName, lastName, email, departments, roles);

		this.searchTerms.next(params);
		//this.searchResponse.subscribe();
		//console.log(this.searchResponse);
	}

	public searchNext(searchParameters: HttpParams)
	{
		return this.http.get<StandardResponse>(AppConfig.USER_SEARCH_URL, {params: searchParameters})
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

	ngOnInit(): void
	{

	}


}
