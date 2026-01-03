'use client';

import { useState, useCallback, useEffect } from 'react';
import { Option, HistoryEntry, RouletteState } from '@/types';
import { COLORS, PRESETS } from '@/constants/presets';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Roulette from '@/components/features/Roulette';
import OptionList from '@/components/features/OptionList';
import PresetSelector from '@/components/features/PresetSelector';
import History from '@/components/features/History';
import AdBanner from '@/components/features/AdBanner';
import ResultModal from '@/components/features/ResultModal';

// ユニークIDを生成
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function Home() {
  const [options, setOptions] = useLocalStorage<Option[]>('pickone-options', []);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('pickone-history', []);
  const [rouletteState, setRouletteState] = useState<RouletteState>('idle');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 選択肢を追加
  const handleAddOption = useCallback((label: string) => {
    const newOption: Option = {
      id: generateId(),
      label,
      color: COLORS[options.length % COLORS.length],
    };
    setOptions([...options, newOption]);
  }, [options, setOptions]);

  // 選択肢を削除
  const handleRemoveOption = useCallback((id: string) => {
    setOptions(options.filter(opt => opt.id !== id));
  }, [options, setOptions]);

  // 全ての選択肢をクリア
  const handleClearOptions = useCallback(() => {
    setOptions([]);
  }, [setOptions]);

  // プリセットを選択
  const handleSelectPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      const newOptions: Option[] = preset.options.map((opt, index) => ({
        id: generateId(),
        label: opt.label,
        color: COLORS[index % COLORS.length],
      }));
      setOptions(newOptions);
    }
  }, [setOptions]);

  // ルーレットを回す
  const handleSpin = useCallback(() => {
    if (options.length < 2 || rouletteState !== 'idle') return;

    const randomIndex = Math.floor(Math.random() * options.length);
    setSelectedIndex(randomIndex);
    setRouletteState('spinning');

    // スピン完了後に結果を表示
    setTimeout(() => {
      const selectedOption = options[randomIndex];
      setResult(selectedOption.label);
      setRouletteState('result');
      setShowModal(true);

      // 履歴に追加
      const entry: HistoryEntry = {
        id: generateId(),
        result: selectedOption.label,
        options: options.map(o => o.label),
        timestamp: Date.now(),
      };
      setHistory((prev) => [...prev.slice(-9), entry]);
    }, 4000);
  }, [options, rouletteState, setHistory]);

  // モーダルを閉じる
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setRouletteState('idle');
  }, []);

  // もう一度回す
  const handleRetry = useCallback(() => {
    setShowModal(false);
    setRouletteState('idle');
    // 少し遅延してから再度スピン
    setTimeout(() => handleSpin(), 100);
  }, [handleSpin]);

  // 履歴をクリア
  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return (
    <div className="min-h-screen pb-8">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-gray-800">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎯</span>
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PickOne
            </h1>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            迷ったらこれ！
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {/* 上部広告 */}
        <AdBanner position="top" />

        {/* ルーレット */}
        <div className="flex justify-center">
          <Roulette
            options={options}
            state={rouletteState}
            selectedIndex={selectedIndex}
            onSpin={handleSpin}
          />
        </div>

        {/* プリセット */}
        <PresetSelector onSelect={handleSelectPreset} />

        {/* 選択肢リスト */}
        <OptionList
          options={options}
          onAdd={handleAddOption}
          onRemove={handleRemoveOption}
          onClear={handleClearOptions}
        />

        {/* 履歴 */}
        <History
          entries={history}
          onClear={handleClearHistory}
        />

        {/* 下部広告 */}
        <AdBanner position="bottom" />
      </main>

      {/* フッター */}
      <footer className="max-w-md mx-auto px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          &copy; 2025 PickOne. All rights reserved.
        </p>
      </footer>

      {/* 結果モーダル */}
      <ResultModal
        result={result}
        isOpen={showModal}
        onClose={handleCloseModal}
        onRetry={handleRetry}
      />
    </div>
  );
}
