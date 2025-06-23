# ![Case Crafter](./public/logo.png)

**テスト仕様書作成ツール**

Case Crafter は、ITa、ITb 等の結合テストのテスト仕様書を効率的に作成できる Web アプリケーションです。

## ✨ 特徴

- **📝 直感的なテストケース管理** - テストケースの作成・編集・削除が簡単
- **📋 詳細な手順管理** - テスト手順をステップごとに管理
- **📸 エビデンス管理** - 画像ファイルの添付・拡大表示機能
- **📊 Excel 出力** - 標準的なテスト仕様書フォーマットでの出力
- **🔄 Git 管理** - JSON ファイルベースでチーム共有対応
- **🎨 モダン UI** - Tailwind CSS v4 による美しいデザイン

## 🚀 技術スタック

- **フロントエンド**: React 18 + TypeScript + Vite
- **UI ライブラリ**: Tailwind CSS v4 + Lucide React
- **状態管理**: Zustand
- **テスト**: Jest + React Testing Library + Playwright
- **データ管理**: JSON ファイルベース + localStorage
- **デプロイ**: GitHub Pages

## 🛠️ 開発環境

### 必要な環境

- Node.js 18.0.0 以上
- npm 9.0.0 以上

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/your-username/case-crafter.git
cd case-crafter

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 利用可能なコマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プレビュー
npm run preview

# リント実行
npm run lint

# テスト実行
npm test

# E2Eテスト実行
npm run test:e2e
```

## 📖 使い方

### 1. テストケース作成

1. サイドバーから「新規プロジェクト」をクリック
2. テストケース一覧で「新規作成」をクリック
3. テストケース名、カテゴリ（ITa、ITb 等）、概要を入力

### 2. テスト手順の管理

1. テストケース詳細画面で「手順追加」をクリック
2. 操作内容と期待結果を入力
3. 必要に応じてエビデンス画像を添付

### 3. エビデンスの管理

- ドラッグ&ドロップで画像ファイルをアップロード
- 画像をクリックで拡大表示
- 各手順に関連付けて整理

### 4. Excel 出力

- ヘッダーの「Excel 出力」ボタンをクリック
- 標準的なテスト仕様書フォーマットでダウンロード

## 🎯 開発方針

このプロジェクトは **TDD（テスト駆動開発）** で実装されており、高い品質とメンテナンス性を確保しています。

- **Red-Green-Refactor** サイクルでの開発
- **90%以上のテストカバレッジ** 目標
- **E2E テスト** による品質保証

## 📁 プロジェクト構造

```
case-crafter/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── __tests__/       # コンポーネントテスト
│   │   ├── Header.tsx       # ヘッダーコンポーネント
│   │   ├── Sidebar.tsx      # サイドバーコンポーネント
│   │   ├── TestCaseList.tsx # テストケース一覧
│   │   └── TestCaseDetail.tsx # テストケース詳細
│   ├── hooks/               # カスタムフック
│   ├── stores/              # 状態管理（Zustand）
│   ├── utils/               # ユーティリティ関数
│   └── types/               # TypeScript型定義
├── tests/
│   ├── e2e/                 # E2Eテスト（Playwright）
│   └── mocks/               # テスト用モックデータ
├── data/                    # Git管理されるテストデータ
└── docs/                    # プロジェクト方針・ガイド
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🙏 謝辞

- [React](https://reactjs.org/) - UI ライブラリ
- [Tailwind CSS](https://tailwindcss.com/) - CSS フレームワーク
- [Vite](https://vitejs.dev/) - ビルドツール
- [Lucide](https://lucide.dev/) - アイコンライブラリ

---

**Case Crafter** で効率的なテスト仕様書作成を始めましょう！ 🚀
