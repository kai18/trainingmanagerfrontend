import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleComponent } from '../../component/role/role.component';
import { PrivilegeUdt } from '../../model/role.model';

@Component({
	selector: 'my-tab',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.css']
})
export class Tabs {

	// userId: string;
	// previleges: PrivilegeUdt[];
	// roleFlag: boolean = false;
	// deptFlag: boolean = false;
	// firstName:string;

	// ngOnInit(): void {
	// 	let decodevalue: any = JSON.parse(localStorage.getItem('decodedtoken'));
	// 	this.userId = decodevalue.jti;
	// 	this.previleges = decodevalue.previleges;
	// 	this.roleFlag = this.checkAccessForRoleManagement();
	// 	this.deptFlag = this.checkAccessForDepartmentManagement();
	// 	let decodeValue: any = JSON.parse(localStorage.getItem('decodedtoken'));
	// 	this.firstName = (decodeValue.firstName).toUpperCase();
	// }

	// checkAccessForRoleManagement(): boolean {
	// 	var flag = false;
	// 	var keepGoing = true;
	// 	this.previleges.forEach((previlege, previlegeIndex) => {
	// 		if (keepGoing) {
	// 			if (previlege.creationPrivilege && previlege.creationPrivilege === 999) {
	// 				if (previlege.deletionPrivilege && previlege.deletionPrivilege === 999) {
	// 					if (previlege.updationPrivilege && previlege.updationPrivilege === 999) {
	// 						if (previlege.readPrivilege && previlege.readPrivilege === 999) {
	// 							flag = true;
	// 							keepGoing = false;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	});
	// 	return flag;
	// }

	// checkAccessForDepartmentManagement(): boolean {
	// 	var flag = false;
	// 	var keepGoing = true;
	// 	this.previleges.forEach((previlege, previlegeIndex) => {
	// 		if (keepGoing) {
	// 			if (previlege.creationPrivilege && previlege.creationPrivilege === 999) {
	// 				if (previlege.deletionPrivilege && previlege.deletionPrivilege === 999) {
	// 					if (previlege.updationPrivilege && previlege.updationPrivilege === 999) {
	// 						if (previlege.readPrivilege && previlege.readPrivilege === 999) {
	// 							flag = true;
	// 							keepGoing = false;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	});
	// 	return flag;
	// }
}