import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleComponent } from '../../component/role/role.component';
import { PrivilegeUdt } from '../../model/role.model';
import { LocalStorageService } from '../../service/LocalStorageService.service';
import {Constants} from '../../model/appconfig.model';

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
  firstName: string;
  isLoggedIn = false;

  constructor(private localStorageService: LocalStorageService) { }

 ngOnInit(): void {
    const decodedValue: any = JSON.parse(localStorage.getItem(Constants.DECODEDTOKEN));
    this.isLoggedIn= JSON.parse(localStorage.getItem(Constants.ISLOGGEDIN));
    if (decodedValue) {
      this.userId = decodedValue.jti;
      this.previleges = this.localStorageService.getLoggedInUserPrivileges();
      this.roleFlag = this.checkAccessForRoleManagement();
      this.deptFlag = this.checkAccessForDepartmentManagement();
    }
  }

  ngDoCheck(): void {
    const decodedValue: any = JSON.parse(localStorage.getItem(Constants.DECODEDTOKEN));
    this.isLoggedIn = JSON.parse(localStorage.getItem(Constants.ISLOGGEDIN));
    if (decodedValue) {
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
        if (previlege.creationPrivilege ) {
          if (previlege.deletionPrivilege ) {
            if (previlege.updationPrivilege ) {
              if (previlege.readPrivilege ) {
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
        if (previlege.creationPrivilege ) {
          if (previlege.deletionPrivilege ) {
            if (previlege.updationPrivilege ) {
              if (previlege.readPrivilege) {
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
