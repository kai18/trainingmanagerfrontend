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

<<<<<<< HEAD
	public checkIfSuperAdmin(privileges: PrivilegeUdt[]): boolean{
		for(let privilege of privileges){
			if(privilege == null || privilege == undefined)
				return true;
		}
		return false;
	}

	public checkIfAllowedToDeleteUser(userToBeDeletedDepartments: Department[]): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
		for(let department of userToBeDeletedDepartments){
			console.log("here");
			for(let privilege of privileges){
				console.log("privilege "  + JSON.stringify(privilege));
				console.log(privilege.department_id + " == " + department.departmentId);
				if(privilege.department_id.localeCompare(department.departmentId))
				{
					console.log("Match");
					if(privilege.deletionPrivilege == 1)
						return true;
					else
						return false;
				}
=======
  private getCommonDepartments(loggedInUserDepartment: Department[], userToBeDeletedDepartments: Department[]): Department[] {
  }

  public checkForDelete(userToBeDeletedDepartments: Department[]): boolean {
    let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
    for (let department of userToBeDeletedDepartments) {
      console.log('here');
      for (let privilege of privileges) {
        console.log('privilege ' + JSON.stringify(privilege));
        console.log(privilege.departmentId + ' == ' + department.departmentId);
        if (privilege.departmentId.localeCompare(department.departmentId)) {
          console.log("Match");
          if (privilege.deletionPrivilege === 1) {
            return true;
          } else {
            return false;
          }
        }
>>>>>>> cad91c83a99010837a34ea81190f185ccbcc176a

      }
    }

  }

<<<<<<< HEAD
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
=======
  public checkForUpdate(userToBeDeletedDepartments: Department[]): boolean {
    let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
    for (let department of userToBeDeletedDepartments) {
      console.log("here");
      for (let privilege of privileges) {
        console.log("privilege " + JSON.stringify(privilege));
        console.log(privilege.departmentId + " == " + department.departmentId);
        if (privilege.departmentId.localeCompare(department.departmentId)) {
          console.log("Match");
          if (privilege.updationPrivilege == 1) {
            return true;
          } else {
            return false;
          }
        }
>>>>>>> cad91c83a99010837a34ea81190f185ccbcc176a

      }
    }

  }

<<<<<<< HEAD
	public checkIfAllowedToInsert(userToBeDeletedDepartments: Department[]): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
		for(let department of userToBeDeletedDepartments){
			console.log("here");
			for(let privilege of privileges){
				console.log("privilege "  + JSON.stringify(privilege));
				console.log(privilege.department_id + " == " + department.departmentId);
				if(privilege.department_id.toString() === department.departmentId.toString())
				{
					console.log("Match");
					if(privilege.creationPrivilege == 1)
						return true;
					else
						return false;
				}
=======
  public checkForInsert(userToBeDeletedDepartments: Department[]): boolean {
    let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();
    for (let department of userToBeDeletedDepartments) {
      console.log("here");
      for (let privilege of privileges) {
        console.log("privilege " + JSON.stringify(privilege));
        console.log(privilege.departmentId + " == " + department.departmentId);
        if (privilege.departmentId.toString() === department.departmentId.toString()) {
          console.log("Match");
          if (privilege.creationPrivilege == 1) {
            return true;
          } else {
            return false;
          }
        }
>>>>>>> cad91c83a99010837a34ea81190f185ccbcc176a

      }
    }

<<<<<<< HEAD
	}

	public checkIfAllowedToDelete(): boolean{
		let privileges: PrivilegeUdt[] = this.localStorageService.getLoggedInUserPrivileges();

		if(this.checkIfSuperAdmin(privileges))
			return true;
		else
			return false;
	}
}
=======
  }
}
>>>>>>> cad91c83a99010837a34ea81190f185ccbcc176a
