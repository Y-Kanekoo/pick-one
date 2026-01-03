import { Preset } from '@/types';

// カラーパレット（視認性の高い色）
export const COLORS = [
  '#FF6B6B', // 赤
  '#4ECDC4', // ティール
  '#45B7D1', // 青
  '#96CEB4', // 緑
  '#FFEAA7', // 黄
  '#DDA0DD', // プラム
  '#98D8C8', // ミント
  '#F7DC6F', // ゴールド
  '#BB8FCE', // 紫
  '#85C1E9', // スカイブルー
];

// プリセット定義
export const PRESETS: Preset[] = [
  {
    id: 'lunch',
    name: 'ランチ',
    icon: '🍽️',
    options: [
      { label: 'ラーメン', color: COLORS[0] },
      { label: 'カレー', color: COLORS[1] },
      { label: '定食', color: COLORS[2] },
      { label: 'パスタ', color: COLORS[3] },
      { label: '寿司', color: COLORS[4] },
      { label: 'うどん', color: COLORS[5] },
    ],
  },
  {
    id: 'dinner',
    name: '夕食',
    icon: '🍴',
    options: [
      { label: '焼肉', color: COLORS[0] },
      { label: '鍋', color: COLORS[1] },
      { label: '居酒屋', color: COLORS[2] },
      { label: 'イタリアン', color: COLORS[3] },
      { label: '中華', color: COLORS[4] },
      { label: '和食', color: COLORS[5] },
    ],
  },
  {
    id: 'movie',
    name: '映画ジャンル',
    icon: '🎬',
    options: [
      { label: 'アクション', color: COLORS[0] },
      { label: 'コメディ', color: COLORS[1] },
      { label: 'ホラー', color: COLORS[2] },
      { label: 'SF', color: COLORS[3] },
      { label: 'ロマンス', color: COLORS[4] },
      { label: 'アニメ', color: COLORS[5] },
    ],
  },
  {
    id: 'weekend',
    name: '週末の過ごし方',
    icon: '🌴',
    options: [
      { label: '映画を観る', color: COLORS[0] },
      { label: 'カフェ巡り', color: COLORS[1] },
      { label: '散歩', color: COLORS[2] },
      { label: 'ゲーム', color: COLORS[3] },
      { label: '読書', color: COLORS[4] },
      { label: '料理', color: COLORS[5] },
    ],
  },
  {
    id: 'yesno',
    name: 'はい/いいえ',
    icon: '🤔',
    options: [
      { label: 'はい', color: COLORS[2] },
      { label: 'いいえ', color: COLORS[0] },
    ],
  },
  {
    id: 'janken',
    name: 'じゃんけん',
    icon: '✊',
    options: [
      { label: 'グー', color: COLORS[0] },
      { label: 'チョキ', color: COLORS[1] },
      { label: 'パー', color: COLORS[2] },
    ],
  },
];
