import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleComponent } from '../../component/role/role.component';
import { PrivilegeUdt } from '../../model/role.model';
import {LocalStorageService} from '../../service/LocalStorageService.service';

@Component({
	selector: 'my-tab',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.css']
})
@Injectable()
export class Tabs {

	userId: string;
	previleges: PrivilegeUdt[];
	roleFlag: boolean = false;
	deptFlag: boolean = false;
	firstName:string;

	constructor(private localStorageService: LocalStorageService){}

	ngOnInit(): void {
		let decodedValue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		if(decodedValue) {
		this.userId = decodedValue.jti;
		this.previleges = this.localStorageService.getLoggedInUserPrivileges();
		this.roleFlag = this.checkAccessForRoleManagement();
		this.deptFlag = this.checkAccessForDepartmentManagement();
		let decodeValue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		this.firstName = (decodeValue.firstName).toUpperCase();
	}
	}

	ngDoCheck(): void{
		let decodedValue: any = JSON.parse(localStorage.getItem('decodedtoken'));
		if(decodedValue) {
		this.userId = decodedValue.jti;
		this.previleges = this.localStorageService.getLoggedInUserPrivileges();
		this.roleFlag = this.checkAccessForRoleManagement();
		this.deptFlag = this.checkAccessForDepartmentManagement();
	}
	}

	checkAccessForRoleManagement(): boolean {
		var flag = false;
		var keepGoing = true;
		this.previleges.forEach((previlege, previlegeIndex) => {
			if (keepGoing) {
				if (previlege.creationPrivilege || previlege.creationPrivilege === 9) {
					if (previlege.deletionPrivilege || previlege.deletionPrivilege === 9) {
						if (previlege.updationPrivilege || previlege.updationPrivilege === 9) {
							if (previlege.readPrivilege || previlege.readPrivilege === 9) {
								flag = true;
								keepGoing = false;
							}
						}
					}
				}
			}
		});
		return flag;
	}

	checkAccessForDepartmentManagement(): boolean {
		var flag = false;
		var keepGoing = true;
		this.previleges.forEach((previlege, previlegeIndex) => {
			if (keepGoing) {
				if (previlege.creationPrivilege === 9) {
					if (previlege.deletionPrivilege === 9) {
						if (previlege.updationPrivilege === 9) {
							if (previlege.readPrivilege === 9) {
								flag = true;
								keepGoing = false;
							}
						}
					}
				}
			}
		});
		return flag;
	}
}