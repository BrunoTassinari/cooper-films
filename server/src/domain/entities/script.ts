import { ScriptStatus } from '../enums/script-status';

export class Script {
  public id: string;
  public title: string;
  public content: string;
  public status: ScriptStatus;
  public is_assumed: boolean;
  public approver_count: number;
  public contact_name: string;
  public contact_email: string;
  public contact_phone: string;
  public created_at: Date;

  constructor(title: string, content: string, contact_name: string, contact_email: string, contact_phone: string) {
    this.id = '';
    this.title = title;
    this.content = content;
    this.status = ScriptStatus.AWAITING_ANALYSIS;
    this.is_assumed = false;
    this.approver_count = 0;
    this.contact_name = contact_name;
    this.contact_email = contact_email;
    this.contact_phone = contact_phone;
    this.created_at = new Date();
  }
}
