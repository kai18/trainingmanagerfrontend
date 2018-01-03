export class Role {
  public roleId: string;
  public roleName: string;
  public roleType: string;
  public roleDescription: string;
  public privilege: PrivilegeUdt;
  public createdDtm: Date;
  public updatedDtm: Date;
}

export class PrivilegeUdt {
  creationPrivilege: number;
  deletionPrivilege: number;
  updationPrivilege: number;
  readPrivilege: number;
  departmentId: string;
}
