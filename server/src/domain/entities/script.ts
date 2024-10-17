import { ScriptStatus } from '../enums/script-status';

export class Script {
  public title: string;
  public content: string;
  public status: string;
  public contact_name: string;
  public contact_email: string;
  public contact_phone: string;

  constructor(
    title: string,
    content: string,
    contact_name: string,
    contact_email: string,
    contact_phone: string
  ) {
    this.title = title;
    this.content = content;
    this.status = ScriptStatus.AWAITING_ANALYSIS as string;
    this.contact_name = contact_name;
    this.contact_email = contact_email;
    this.contact_phone = contact_phone;
  }
}
