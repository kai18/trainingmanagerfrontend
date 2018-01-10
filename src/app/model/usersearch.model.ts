import {Address} from './address.model';
import {Role} from './role.model';
import {Department} from './department.model';
export class UserSearch {
	id: string;
	firstName: string;
	lastName: string;
	gender: string;
	emailId: string;
	phoneNumber: string;
	address: Address;
	public role: Array<Role>;
	public departments: Array<Department>;
}
