# Next.js Examples Collection

このリポジトリは、Next.jsを使用した様々な技術スタックやユースケースのサンプルプロジェクト集です。

## 📁 プロジェクト一覧

### UI/スタイリング関連

#### `kuma-ui-example`

- **説明**: Kuma UIを使用したNext.jsアプリケーション
- **技術スタック**: Next.js, Kuma UI, Emotion, Storybook
- **特徴**: CSS-in-JSライブラリのKuma UIを使用したスタイリング例

#### `with-preact`

- **説明**: PreactをReactの代替として使用したNext.jsアプリケーション
- **技術スタック**: Next.js, Preact, Emotion, Tailwind CSS, Storybook
- **特徴**: バンドルサイズを削減するためのPreact統合例

#### `sticky-example`

- **説明**: スティッキー要素の実装例
- **技術スタック**: Next.js, Tailwind CSS
- **特徴**: スクロール時の要素固定機能の実装

#### `next-gsap-example`

- **説明**: GSAPアニメーションライブラリを使用したNext.jsアプリケーション
- **技術スタック**: Next.js, GSAP
- **特徴**: 高度なアニメーション実装例

### 状態管理

#### `next-zustand-example`

- **説明**: Zustandを使用した状態管理の実装例
- **技術スタック**: Next.js, Zustand, Tailwind CSS
- **特徴**: 軽量な状態管理ライブラリの使用例

### AWS統合

#### `next-amplified`

- **説明**: AWS Amplifyを統合したNext.jsアプリケーション
- **技術スタック**: Next.js, AWS Amplify, Amplify UI React, Tailwind CSS
- **特徴**: AWS Amplifyを使用したフルスタック開発例

#### `next-ts-amplify-hosting-template`

- **説明**: AWS Amplify Hostingを使用したNext.jsテンプレート
- **技術スタック**: Next.js, TypeScript, Tailwind CSS, Storybook, CDK
- **特徴**: AWS Amplify Hostingでのデプロイメント例

#### `cloudwatch-rum`

- **説明**: AWS CloudWatch RUMを統合したNext.jsアプリケーション
- **技術スタック**: Next.js, AWS CloudWatch RUM, CDK
- **特徴**: リアルユーザーモニタリングの実装例

### 認証・OAuth

#### `github-auth-ssg`

- **説明**: GitHub OAuthを使用した静的サイト生成の例
- **技術スタック**: Next.js, GitHub OAuth
- **特徴**: 静的サイトでの認証実装

#### `mui-github-oauth`

- **説明**: Material-UIとGitHub OAuthを組み合わせた例
- **技術スタック**: Next.js, Material-UI, GitHub OAuth
- **特徴**: UIライブラリと認証の統合例

### 開発ツール・設定

#### `next-ts-biome-example`

- **説明**: Biomeを使用したNext.js TypeScriptプロジェクト
- **技術スタック**: Next.js, TypeScript, Biome, Tailwind CSS
- **特徴**: 高速なリンター・フォーマッターBiomeの使用例

#### `with-rspack`

- **説明**: Rspackバンドラーを使用したNext.jsアプリケーション
- **技術スタック**: Next.js, Rspack, Storybook
- **特徴**: 高速バンドラーRspackの統合例

#### `with-beta`

- **説明**: Next.jsのベータ版機能を使用したサンプル
- **技術スタック**: Next.js (Beta), Tailwind CSS
- **特徴**: 最新のNext.js機能の実験的実装

### 国際化・多言語対応

#### `next-i18n`

- **説明**: next-i18nextを使用した多言語対応アプリケーション
- **技術スタック**: Next.js, next-i18next, AWS CloudFront, S3
- **特徴**: 国際化対応とAWSでのデプロイメント

### 特殊技術

#### `wasm`

- **説明**: WebAssemblyを使用したNext.jsアプリケーション
- **技術スタック**: Next.js, TypeScript, WebAssembly
- **特徴**: WebAssemblyとNext.jsの統合例

#### `vnc-example`

- **説明**: VNC Webクライアントの実装例
- **技術スタック**: Next.js, VNC, noVNC
- **特徴**: ブラウザベースのVNCクライアント

#### `graphql-msw`

- **説明**: GraphQLとMock Service Workerを使用した例
- **技術スタック**: Next.js, GraphQL, MSW
- **特徴**: GraphQL APIのモッキングとテスト

### ルーティング

#### `nextjs-dynamic-routing-app`

- **説明**: Next.jsの動的ルーティング機能のデモ
- **技術スタック**: Next.js, Docker, Nginx
- **特徴**: 動的ルーティングとDockerでのデプロイメント

## 🚀 使用方法

### 前提条件

- Node.js 22以上
- pnpm (推奨パッケージマネージャー)

### セットアップ

1. リポジトリをクローン:

   ```bash
   git clone https://github.com/poad/nextjs/next-examples.git
   cd next-examples
   ```

2. 依存関係をインストール:

   ```bash
   pnpm install
   ```

3. 全プロジェクトをビルド:

   ```bash
   pnpm build
   ```

4. 全プロジェクトのリント実行:

   ```bash
   pnpm lint
   ```

### 個別プロジェクトの実行

各プロジェクトディレクトリに移動して、個別に実行できます:

```bash
cd kuma-ui-example
pnpm dev
```

## 🛠️ 技術スタック

このリポジトリで使用されている主要な技術:

- **フレームワーク**: Next.js (App Router, Pages Router)
- **言語**: TypeScript, JavaScript
- **スタイリング**: Tailwind CSS, Emotion, Kuma UI, Material-UI
- **状態管理**: Zustand
- **アニメーション**: GSAP
- **バンドラー**: Webpack, Rspack, Turbopack
- **開発ツール**: ESLint, Biome, Storybook
- **クラウド**: AWS (Amplify, CloudWatch, S3, CloudFront)
- **認証**: GitHub OAuth
- **その他**: WebAssembly, GraphQL, VNC, i18n

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は各プロジェクトのLICENSEファイルを参照してください。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。新しいサンプルプロジェクトの追加提案もお気軽にどうぞ。
