export class UserScript {
  public id: string;
  public user_id: string;
  public script_id: string;

  constructor(user_id: string, script_id: string) {
    this.id = '';
    this.user_id = user_id;
    this.script_id = script_id;
  }
}
