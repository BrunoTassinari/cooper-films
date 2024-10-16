import { ScriptStatus } from "../enums/script-status";

export class Script {
  private _content: string;
  private _status: ScriptStatus;
  private _contact_name: string;
  private _contact_email: string;
  private _contact_phone: string;

  constructor(content: string, contact_name: string, contact_email: string, contact_phone: string) {
    this._content = content;
    this._status = ScriptStatus.AWAITING_ANALYSIS;
    this._contact_name = contact_name;
    this._contact_email = contact_email;
    this._contact_phone = contact_phone;
  }

  validate(content: string, contact_name: string, contact_email: string, contact_phone: string) {
    if(content.length < 1) {
      return 'Content cannot be empty';
    }

    if(contact_name.length < 1) {
      return 'Contact name cannot be empty';
    }

    if(contact_email.length < 1) {
      return 'Contact email cannot be empty';
    }

    if(contact_phone.length < 1) {
      return 'Contact phone cannot be empty';
    }
  }

}