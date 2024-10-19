export class ScriptHistoriy {
  public id: string;
  public script_id: string;
  public user_id: string;
  public action: string;
  public observation: string;

  constructor(
    script_id: string,
    user_id: string,
    action: string,
    observation?: string
  ) {
    this.id = '';
    this.script_id = script_id;
    this.user_id = user_id;
    this.action = action;
    this.observation = observation || '';
  }
}
