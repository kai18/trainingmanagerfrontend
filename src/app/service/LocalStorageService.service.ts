import {Department} from '../model/department.model';
import {Role, PrivilegeUdt} from '../model/role.model';

export class LocalStorageService{
	constructor(){}

	public saveJwtToken(jwtToken: string)
	{
		localStorage.setItem('jwt-token', jwtToken);
	}

	public getJwtToken(): string{
		return localStorage.getItem('jwt-token');
	}

	public getLoggedInUserDepartments(): Department[]
	{
		let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		let departments: Department[] = decodevalue.departments;
		console.log(departments);
		return departments;
	}

	public getLoggedInUserPrivileges(): PrivilegeUdt[]{
		let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		let privileges: PrivilegeUdt[] = decodevalue.privileges;
		console.log(privileges);
		return privileges;
	}
}