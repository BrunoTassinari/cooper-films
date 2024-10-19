import { ScriptStatus } from '../domain/enums/script-status';

export function translateStatus(status: ScriptStatus): string {
  const translate: { [key in ScriptStatus]: string } = {
    [ScriptStatus.AWAITING_ANALYSIS]: 'Aguardando análise',
    [ScriptStatus.IN_ANALYSIS]: 'Em análise',
    [ScriptStatus.AWAITING_REVIEW]: 'Aguardando revisão',
    [ScriptStatus.IN_REVIEW]: 'Em revisão',
    [ScriptStatus.AWAITING_APPROVAL]: 'Aguardando aprovação',
    [ScriptStatus.IN_APPROVAL]: 'Em aprovação',
    [ScriptStatus.APPROVED]: 'Aprovado',
    [ScriptStatus.REJECTED]: 'Rejeitado',
    [ScriptStatus.ERROR]: 'Erro',
  };

  return translate[status];
}
