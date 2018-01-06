 import { Address } from '../model/address.model';
// import { Role } from '../models';
// import { Department } from '../models';
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
	// public role: Array<Role>;
	// public departments: Array<Department>;
}