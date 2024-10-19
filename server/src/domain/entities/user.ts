import type { UserRoles } from '../enums/user-roles';

export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: UserRoles;

  constructor(name: string, email: string, password: string, role: UserRoles) {
    this.id = '';
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
