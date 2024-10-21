export type UserData = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type ScriptData = {
  id: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
  contact_name: string;
  approver_count: string;
};

export type ChangeScriptStatusBody = {
  script_id: string;
  user_id: string;
  status: string;
  observation?: string;
};

export type CreateScriptBody = {
  title: string;
  content: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

export type ScriptHistoricBody = {
  script_id: string;
  user_id: string;
  action: string;
  observation?: string;
};

export type CreateUserScriptBody = {
  script_id: string;
  user_id: string;
};
