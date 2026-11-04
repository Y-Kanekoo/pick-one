'use client';

import { useEffect, useState } from 'react';

interface ResultModalProps {
  result: string | null;
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export default function ResultModal({ result, isOpen, onClose, onRetry }: ResultModalProps) {
  if (!isOpen) return null;

  return <VisibleResultModal result={result} onClose={onClose} onRetry={onRetry} />;
}

function VisibleResultModal({ result, onClose, onRetry }: Omit<ResultModalProps, 'isOpen'>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // アニメーション用に少し遅延
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-3xl p-8
          max-w-sm w-full text-center
          transform transition-all duration-300
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 装飾 */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            結果は...
          </p>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            {result}
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="
              flex-1 py-3 px-4 rounded-xl
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-bold
              hover:from-purple-600 hover:to-pink-600
              transition-all transform hover:scale-105
            "
          >
            もう一度
          </button>
          <button
            onClick={onClose}
            className="
              flex-1 py-3 px-4 rounded-xl
              bg-gray-100 dark:bg-gray-700
              text-gray-700 dark:text-gray-300 font-bold
              hover:bg-gray-200 dark:hover:bg-gray-600
              transition-colors
            "
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
