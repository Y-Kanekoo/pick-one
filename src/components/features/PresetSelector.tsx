'use client';

import { PRESETS } from '@/constants/presets';

interface PresetSelectorProps {
  onSelect: (presetId: string) => void;
}

export default function PresetSelector({ onSelect }: PresetSelectorProps) {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        プリセット
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className="
              flex flex-col items-center gap-2 p-4 rounded-xl
              bg-white dark:bg-gray-800
              hover:bg-purple-50 dark:hover:bg-gray-700
              border-2 border-transparent hover:border-purple-300
              shadow-md hover:shadow-lg
              transition-all duration-200
              group
            "
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {preset.icon}
            </span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
