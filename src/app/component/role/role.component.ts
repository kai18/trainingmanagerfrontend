import { Department } from './../../model/department.model';
import { DepartmentService } from './../../service/DepartmentService';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role, PrivilegeUdt } from '../../model/role.model';
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
  allDepartments: Department[];
  statusCode: number;
  processValidation = true;
  requestProcessing = false;
  isCreate = false;
  isUpdate = false;
  isDepartment = false;
  rForm: FormGroup;
  roleId: any;
  roleName: string = '';
  roleType: string = '';
  roleDescription: string = '';
  privilege: PrivilegeUdt;
  createdDtm: Date;
  updatedDtm: Date;
  departmentId: any;
  post: any;
  standardResponse: StandardResponse;

  constructor(private roleService: RoleService, private departmentService: DepartmentService,
    private router: Router, private fb: FormBuilder) {
    this.rForm = fb.group({
      'roleName': ['', Validators.required],
      'roleType': ['', Validators.required],
      'departmentId': null,
      'roleDescription': ['', Validators.required],
      'creationPrivilege': 0,
      'deletionPrivilege': 0,
      'updationPrivilege': 0,
      'readPrivilege': [{ value: 1, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllDepartments();
  }

  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  // Fetch all Roles
  getAllRoles() {
    this.roleService.getAllRoles()
      .subscribe(
      data => this.allRoles = data.element,
      errorCode => this.statusCode = errorCode);
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments()
      .subscribe(
        data => this.allDepartments = data.element,
        errorCode => this.statusCode = errorCode);
  }

  // Handle create
  onRoleFormSubmit(post) {
    this.processValidation = true;
    if (this.rForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const roleName = this.rForm.get('roleName').value.trim();
    const roleType = this.rForm.get('roleType').value.trim();
    const roleDescription = this.rForm.get('roleDescription').value.trim();
    const createPrivilege = this.rForm.get('creationPrivilege').value;
    const deletePrivilege = this.rForm.get('deletionPrivilege').value;
    const updatePrivilege = this.rForm.get('updationPrivilege').value;
    const readPrivilege = this.rForm.get('readPrivilege').value;
    let departmentId;
    if (this.isDepartment) {
      departmentId = this.rForm.get('departmentId').value;
    } else {
      departmentId = null;
    }

    if (this.isCreate) {
      // Handle create Role
      const role = new Role();
      const privilege = new PrivilegeUdt();

      role.roleName = roleName;
      role.roleType = roleType;
      role.roleDescription = roleDescription;
      role.privilege = privilege;
      if (createPrivilege) {
        role.privilege.creationPrivilege = 1;
      }
      if (deletePrivilege) {
        role.privilege.deletionPrivilege = 1;
      }
      if (updatePrivilege) {
        role.privilege.updationPrivilege = 1;
      }
      role.privilege.readPrivilege = 1;
      role.privilege.departmentId = departmentId;

      role.createdDtm = null;
      role.updatedDtm = null;

      this.roleService.createRole(role)
        .subscribe(response => {
          this.standardResponse = response;
          // this.getAllRoles();
          this.backToCreateRole();
        },
        errorCode => this.statusCode = errorCode);
    }
  }

  // Go back from update to create
  backToCreateRole() {
    this.isUpdate = false;
    this.isCreate = false;
    this.rForm.reset();
    this.processValidation = false;
  }

  toggleCreate() {
    if (this.isCreate) {
      this.isCreate = false;
    } else {
      this.isCreate = true;
    }
  }

  toggleRole() {
    if (this.isCreate) {
      this.isCreate = false;
      this.isUpdate = false;
    } else {
      this.isCreate = true;
      this.isUpdate = false;
    }
  }

  deptToggle() {
    if (this.rForm.get('roleType').value === 'department') {
      this.isDepartment = true;
    } else {
      this.isDepartment = false;
    }
  }
}

// https://coursetro.com/posts/code/66/Angular-4-Reactive-Forms-Tutorial
