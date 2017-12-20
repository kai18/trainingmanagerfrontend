import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../../model/role.model';
import { StandardResponse } from './../../model/standardresponse.model';
import { RoleService } from './../../service/RoleService.service';

@Component({
    moduleId: module.id,
    selector: 'role',
    templateUrl: 'role.component.html',
    styleUrls: ['role.component.scss']
})
export class RoleComponent {
    allRoles: Role[];
    statusCode: number;
    isCreate = false;
    roleName = new FormControl('', Validators.required);
    roleType = new FormControl('', Validators.required);
    roleDescription = new FormControl('', Validators.required);
    createdDtm: FormControl;
    updatedDtm: FormControl;
    departmentId: FormControl;

    constructor(private roleService: RoleService, private router: Router ) {}

    ngOnInit(): void {
      this.getAllRoles();
    }

    // Fetch all Roles
    getAllRoles() {
      this.roleService.getAllRoles()
          .subscribe(
          data => this.allRoles = data.element,
          errorCode => this.statusCode = errorCode);
  }
}
