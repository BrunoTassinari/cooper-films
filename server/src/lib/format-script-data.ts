import dayjs from 'dayjs';
import type { Script } from '../domain/entities/script';
import type { ScriptData } from '../types/index.ts';
import { translateStatus } from './translate-status';

export function formatScriptData(script: Script): ScriptData {
  return {
    id: script.id,
    title: script.title,
    content: script.content,
    status: translateStatus(script.status),
    created_at: dayjs(script.created_at).format('DD/MM/YYYY'),
    contact_name: script.contact_name,
    approver_count: `${script.approver_count} / 3`,
  };
}
