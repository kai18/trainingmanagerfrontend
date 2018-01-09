import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import {StandardResponse} from '../model/standardresponse.model';
import {AppConfig} from '../model/appconfig.model';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';


@Injectable()
export class UserService{

	constructor(private http: HttpClient){}

	public searchNext(searchParameters: HttpParams)
	{
		return this.http.get<StandardResponse>(AppConfig.USER_SEARCH_URL, {params: searchParameters});
	}

	public register(user: User)
	{
		return this.http.post<StandardResponse>(AppConfig.USER_URL, user);
	}
	
	public login(user: User)
	{
		return this.http.post<StandardResponse>(AppConfig.AUTHENTICATION_API_ENDPOINT, user);
	}

	public getUserById(userId: string): Observable<StandardResponse> {
		console.log("user by id");
		var token = localStorage.getItem('jwt-token');
		console.log(token);
		let headers = new HttpHeaders();
				//let options = new RequestOptions({ headers: headers });
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('jwt-token', token)
		return this.http.get<StandardResponse>(AppConfig.USER_URL + userId, {headers: headers});
			//.map(this.extractData)
	}
	public update(user: User): Observable<StandardResponse> {
		
		console.log("update from service");

		//let headers = new Headers({ 'Content-Type': 'application/json' });
		//let options = new RequestOptions({ headers: headers });
		return this.http.put<StandardResponse>(AppConfig.USER_URL, user);
			//.map(this.extractData)
	}

	public delete(userId: string)
	{
		return this.http.delete<StandardResponse>(AppConfig.USER_URL + userId);
	}
}