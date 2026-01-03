'use client';

import { useState } from 'react';
import { Option } from '@/types';
import { COLORS } from '@/constants/presets';

interface OptionListProps {
  options: Option[];
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function OptionList({ options, onAdd, onRemove, onClear }: OptionListProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          選択肢
        </h2>
        {options.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            すべて削除
          </button>
        )}
      </div>

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="選択肢を入力..."
            maxLength={20}
            className="
              flex-1 px-4 py-3 rounded-xl
              bg-gray-100 dark:bg-gray-700
              text-gray-800 dark:text-white
              placeholder-gray-400
              border-2 border-transparent
              focus:border-purple-500 focus:outline-none
              transition-colors
            "
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="
              px-4 py-3 rounded-xl
              bg-purple-500 text-white font-bold
              hover:bg-purple-600
              disabled:bg-gray-300 disabled:cursor-not-allowed
              transition-colors
            "
          >
            追加
          </button>
        </div>
      </form>

      {/* 選択肢リスト */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {options.length === 0 ? (
          <p className="text-center text-gray-400 py-4">
            選択肢を追加してください
          </p>
        ) : (
          options.map((option, index) => (
            <div
              key={option.id}
              className="
                flex items-center gap-3 p-3 rounded-xl
                bg-gray-50 dark:bg-gray-700
                group hover:bg-gray-100 dark:hover:bg-gray-600
                transition-colors
              "
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="flex-1 text-gray-800 dark:text-white truncate">
                {option.label}
              </span>
              <button
                onClick={() => onRemove(option.id)}
                className="
                  opacity-0 group-hover:opacity-100
                  text-gray-400 hover:text-red-500
                  transition-all
                "
                aria-label={`${option.label}を削除`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {options.length > 0 && (
        <p className="mt-3 text-sm text-gray-400 text-center">
          {options.length} 個の選択肢
        </p>
      )}
    </div>
  );
}
