'use client';

import { HistoryEntry } from '@/types';

interface HistoryProps {
  entries: HistoryEntry[];
  onClear: () => void;
}

export default function History({ entries, onClear }: HistoryProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          履歴
        </h2>
        <button
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          クリア
        </button>
      </div>

      <div className="space-y-3 max-h-48 overflow-y-auto">
        {entries.slice().reverse().map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-lg">🎯</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 dark:text-white truncate">
                {entry.result}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {entry.options.length}個の選択肢から
              </p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">
              {formatTime(entry.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
