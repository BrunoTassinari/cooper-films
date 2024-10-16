import type { UserRoles } from "../enums/user-roles";

export class User {
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: UserRoles;

  constructor(name: string, email: string, password: string, role: UserRoles) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._role = role;
  }
}