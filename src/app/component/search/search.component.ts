import {Component, Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject"
import 'rxjs/add/operator/map';
import {UserSearch} from '../../model/usersearch.model';
import {AppConfig} from '../../model/appconfig.model';
import {StandardResponse} from '../../model/standardresponse.model';
@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

@Injectable()
export class Search{

	private searchTerms = new Subject<string>();
	constructor(private http: HttpClient)
	{}

	public search(firstName, lastName, email, departments, roles)
	{
		let params = this.addSearchParameters(firstName, lastName, email, departments, roles);

		console.log(firstName, lastName, email, departments, roles);

		this.searchNext(params).subscribe(data => console.log(data));
	}

	public searchNext(searchParameters: HttpParams)
	{
		return this.http.get<StandardResponse>(AppConfig.USER_SEARCH_URL, {params: searchParameters});
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
			params.append('firstName', firstName);
		if(this.validateField(lastName))
			params.append('lastName', lastName);
		if(this.validateField(email))
			params.append('email', email);
		if(this.validateField(departments))
			params.append('departments', departments);
		if(this.validateField(roles))
			params.append('roles', roles);

		return params;
	}

	onInit()
	{

	}


}