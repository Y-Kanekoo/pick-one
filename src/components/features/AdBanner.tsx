'use client';

interface AdBannerProps {
  position: 'top' | 'bottom';
}

// 広告プレースホルダー（実際の広告はGoogle AdSense等に置き換え）
export default function AdBanner({ position }: AdBannerProps) {
  return (
    <div
      className={`
        w-full max-w-md mx-auto
        ${position === 'top' ? 'mb-4' : 'mt-6'}
      `}
    >
      <div
        className="
          w-full h-[100px] rounded-xl
          bg-gradient-to-r from-gray-100 to-gray-200
          dark:from-gray-700 dark:to-gray-800
          flex items-center justify-center
          border-2 border-dashed border-gray-300 dark:border-gray-600
        "
      >
        <div className="text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            広告スペース
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-600">
            320 x 100
          </p>
        </div>
      </div>
    </div>
  );
}
