# PickOne

迷ったらこれ！ルーレット式ランダム選択アプリ

## 概要

ランチ、映画、行き先...日常の「決められない」をルーレットで解決するWebアプリです。

## デモ

**本番サイト**: https://pick-one.pages.dev

### ローカル開発

```bash
npm run dev
```

http://localhost:3000 でアプリを確認できます。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データ永続化**: localStorage
- **ホスティング**: Cloudflare Pages

## 機能一覧

| 機能 | 説明 |
|------|------|
| ルーレット | アニメーション付きのランダム選択 |
| プリセット | ランチ、夕食、映画、週末、はい/いいえ、じゃんけん |
| カスタム選択肢 | 自由に追加・削除可能 |
| データ保存 | 選択肢と履歴を自動保存 |
| 履歴機能 | 過去10件の結果を記録 |
| 広告エリア | 上下に広告表示スペースを配置 |
| ダークモード | システム設定に連動 |

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx        # メインページ
│   └── globals.css     # グローバルスタイル
├── components/
│   └── features/
│       ├── Roulette.tsx       # ルーレットコンポーネント
│       ├── OptionList.tsx     # 選択肢リスト
│       ├── PresetSelector.tsx # プリセット選択
│       ├── History.tsx        # 履歴表示
│       ├── ResultModal.tsx    # 結果モーダル
│       └── AdBanner.tsx       # 広告バナー
├── hooks/
│   └── useLocalStorage.ts     # localStorage管理
├── types/
│   └── index.ts               # 型定義
└── constants/
    └── presets.ts             # プリセットデータ
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start
```

## 広告収入化

1. Google AdSenseに申請
2. `src/components/features/AdBanner.tsx` をAdSenseコードに置き換え
3. Vercel等にデプロイ

## 開発履歴

### v1.0.0 (2025-01-04)

- [x] Next.jsプロジェクトを初期化
- [x] 基本レイアウトとUIコンポーネントを作成
- [x] ルーレット/くじ引き機能を実装
- [x] 選択肢の追加・削除・保存機能を実装
- [x] プリセット機能を実装（6種類）
- [x] 履歴機能を実装
- [x] 広告表示エリアを配置
- [x] ビルド確認とエラー修正
- [x] GitHubリポジトリを作成しpush
- [x] Vercelにデプロイ
- [x] Cloudflare Pagesに移行（商用利用対応）

## ライセンス

MIT
