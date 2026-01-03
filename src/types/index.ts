// 選択肢の型
export interface Option {
  id: string;
  label: string;
  color: string;
}

// プリセットの型
export interface Preset {
  id: string;
  name: string;
  icon: string;
  options: Omit<Option, 'id'>[];
}

// 履歴エントリの型
export interface HistoryEntry {
  id: string;
  result: string;
  options: string[];
  timestamp: number;
}

// ルーレットの状態
export type RouletteState = 'idle' | 'spinning' | 'result';
