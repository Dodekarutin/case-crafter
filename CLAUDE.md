# Case Crafter プロジェクト情報

## プロジェクト概要

ITa、ITb 等の結合テストのテスト仕様書を効率的に作成できる Web アプリケーション

## 技術スタック

- React 18 + TypeScript + Vite
- Tailwind CSS（UI スタイリング）
- Zustand（状態管理）
- Lucide React（アイコン）

## 現在の実装状況

- 基本的な UI コンポーネント完成（Header、Sidebar、TestCaseList、TestCaseDetail）
- モックデータでの画面表示確認済み

## 開発方針

- TDD（テスト駆動開発）によるユニットテスト中心の開発
- t-wada さん推奨の小さな TDD サイクル（Red→Green→Refactor）

## 次に実装する機能

左サイドバーのプラスボタンからの新規プロジェクト追加機能

## Claude への指示

- **言語設定**: すべての出力を日本語で行う
- **開発手法**: TDD 手法を厳守し、テストファーストで実装
- **コードスタイル**: 既存のコード規約に従う
- **品質確保**: 各実装後に lint/typecheck を実行

## テストコマンド

- `npm run lint`: ESLint によるコード品質チェック
