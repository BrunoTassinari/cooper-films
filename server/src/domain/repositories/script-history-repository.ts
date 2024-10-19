import type { ScriptHistoriy } from '../entities/script-history';

export interface ScriptHistoryRepository {
  create(scriptHistories: ScriptHistoriy): Promise<void>;
}
