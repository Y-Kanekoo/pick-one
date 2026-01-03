'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Option, RouletteState } from '@/types';

interface RouletteProps {
  options: Option[];
  state: RouletteState;
  selectedIndex: number | null;
  onSpin: () => void;
}

export default function Roulette({ options, state, selectedIndex, onSpin }: RouletteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // ルーレットを描画
  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas || options.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 影を追加
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;

    const sliceAngle = (2 * Math.PI) / options.length;

    options.forEach((option, index) => {
      const startAngle = rotation + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // セクションを描画
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = option.color;
      ctx.fill();

      // 境界線
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // テキストを描画
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 3;

      // テキストを適切な長さに切り詰め
      const maxLength = 8;
      const text = option.label.length > maxLength
        ? option.label.slice(0, maxLength) + '...'
        : option.label;
      ctx.fillText(text, radius - 20, 5);
      ctx.restore();
    });

    // 中央の円
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 矢印（ポインター）を描画
    ctx.beginPath();
    ctx.moveTo(centerX + radius + 15, centerY);
    ctx.lineTo(centerX + radius - 10, centerY - 15);
    ctx.lineTo(centerX + radius - 10, centerY + 15);
    ctx.closePath();
    ctx.fillStyle = '#FF4757';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [options]);

  // スピンアニメーション
  useEffect(() => {
    if (state === 'spinning' && selectedIndex !== null) {
      const sliceAngle = (2 * Math.PI) / options.length;
      // 選択されたインデックスが右側（ポインター位置）に来るように計算
      const targetRotation = -(selectedIndex * sliceAngle) - sliceAngle / 2 + (Math.PI * 8); // 4回転 + ターゲット位置

      const startRotation = rotationRef.current;
      const duration = 4000; // 4秒
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // イージング（減速）
        const easeOut = 1 - Math.pow(1 - progress, 4);

        rotationRef.current = startRotation + (targetRotation - startRotation) * easeOut;
        drawWheel(rotationRef.current);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [state, selectedIndex, options.length, drawWheel]);

  // 初期描画
  useEffect(() => {
    drawWheel(rotationRef.current);
  }, [options, drawWheel]);

  const canSpin = state === 'idle' && options.length >= 2;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="drop-shadow-xl"
        />
      </div>

      <button
        onClick={onSpin}
        disabled={!canSpin}
        className={`
          px-8 py-4 rounded-full text-lg font-bold text-white
          transition-all duration-300 transform
          ${canSpin
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            : 'bg-gray-300 cursor-not-allowed'}
        `}
      >
        {state === 'spinning' ? '回転中...' : 'まわす！'}
      </button>

      {options.length < 2 && (
        <p className="text-sm text-gray-500">
          2つ以上の選択肢を追加してください
        </p>
      )}
    </div>
  );
}
