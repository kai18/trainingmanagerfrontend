import { Injectable } from '@angular/core';

import { Role, PrivilegeUdt } from '../model/role.model';
import { Department } from '../model/department.model';

import { RoleService } from '../service/RoleService.service';
import { LocalStorageService } from '../service/LocalStorageService.service';

import { Observable } from 'rxjs';
@Injectable()
export class PrivilegeCheckerService {

  privilegesObservable: Observable<Array<PrivilegeUdt>>;

  constructor(private roleService: RoleService, private localStorageService: LocalStorageService) { }

	public checkIfSuperAdmin(privileges: PrivilegeUdt[]): boolean{
		for(let privilege of privileges){
			if((privilege.department_id == null || privilege.department_id == undefined) 
				&& privilege.creationPrivilege ==1 || privilege.deletionPrivilege || privilege.updationPrivilege == 1)
				return true;
		}
		return false;
	}

	public checkIfAllowedToDeleteUser(userToBeDeletedDepartments: Department[]): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();

		if(this.checkIfSuperAdmin(privileges))
			return true;
		for(let department of userToBeDeletedDepartments){
			console.log("here");
			for(let privilege of privileges){
				console.log("privilege "  + JSON.stringify(privilege));
				console.log(privilege.department_id + " == " + department.departmentId);
				if(privilege.department_id != null && privilege.department_id.localeCompare(department.departmentId))
				{
					console.log("Match");
					if(privilege.deletionPrivilege == 1)
						return true;
					else
						return false;
				}  
			}
		}
	}

  	public checkIfAllowedToEditUser(userToBeDeletedDepartments: Department[]): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
		for(let department of userToBeDeletedDepartments){
			console.log("here");
			for(let privilege of privileges){
				console.log("privilege "  + JSON.stringify(privilege));
				console.log(privilege.department_id + " == " + department.departmentId);
				if(privilege.department_id.localeCompare(department.departmentId))
				{
					console.log("Match");
					if(privilege.updationPrivilege == 1)
						return true;
					else
						return false;
				}
			}
		}
	}


	public checkIfAllowedToInsert(): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
		
		if(this.checkIfSuperAdmin(privileges))
			return true;
		else
			return false;
	}

	public checkIfAllowedToDelete(): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();

		if(this.checkIfSuperAdmin(privileges))
			return true;
		else
			return false;
	}
}
