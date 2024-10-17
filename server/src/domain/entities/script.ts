import { ScriptStatus } from '../enums/script-status';

export class Script {
  public content: string;
  public status: ScriptStatus;
  public contact_name: string;
  public contact_email: string;
  public contact_phone: string;

  constructor(
    content: string,
    contact_name: string,
    contact_email: string,
    contact_phone: string
  ) {
    this.content = content;
    this.status = ScriptStatus.AWAITING_ANALYSIS;
    this.contact_name = contact_name;
    this.contact_email = contact_email;
    this.contact_phone = contact_phone;
  }
}
