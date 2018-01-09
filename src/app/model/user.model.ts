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
<<<<<<< HEAD
	public role: Array<Role>;
=======
	public roles: Array<Role>;
>>>>>>> 81a8f06faf01c19f90d8fb0ac12a0e7c11096bd0
	public departments: Array<Department>;
}