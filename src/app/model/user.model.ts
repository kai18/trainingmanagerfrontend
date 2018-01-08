 import { Address } from '../model/address.model';
 import { Role } from '../model/role.model';
 import { Department } from '../model/department.model';
export class User {
	public userId: number;
	public emailId: string;
	public password: string;
	public lastName: string;
	public firstName: string;
	public gender: string;
	public phoneNumber: string;
	public isActive: boolean;
	public address: Address;
	public roles: Array<Role>;
	public departments: Array<Department>;
}