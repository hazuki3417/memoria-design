# Memoria Design

Memoriaを構成する複数リポジトリに共通する、プロダクト設計とアーキテクチャの正本です。ドキュメントサイトはNextra 4、Next.js App Router、MDXで構築しています。

## このリポジトリに置く情報

- プロダクト概要、要求、ユビキタス言語
- システム構成とリポジトリ間の責務
- Web、API、データベース、インフラストラクチャの設計
- 横断的な開発・テスト・リリース方針
- 設計の意図、制約、採用しない方式と理由
- AI contextの索引と読み取り順序

実行可能なGraphQL・SQL schema、コード生成設定、環境設定は、それを所有する実装リポジトリを正本とします。

## 関連リポジトリ

| リポジトリ | 責務 |
| --- | --- |
| [memoria-web](https://github.com/hazuki3417/memoria-web) | Web UIとGraphQLクライアント |
| [memoria-api](https://github.com/hazuki3417/memoria-api) | GraphQL API、Media Worker、Outbox Publisher、ドメインロジック、永続化 |
| [memoria-design](https://github.com/hazuki3417/memoria-design) | プロダクト設計と横断的な意思決定 |
| [memoria-IaC](https://github.com/hazuki3417/memoria-IaC) | AWS CDKによる実行環境 |

## Nextraの構成

- `app/`: App RouterのlayoutとMDX catch-all route
- `content/`: ドキュメント本文と階層ごとの`_meta.js`
- `mdx-components.js`: Nextra themeのMDX component
- `next.config.mjs`: Nextraを組み込むNext.js設定

ドキュメント本文は`content/`を正本とし、`pages/`は使用しません。ページを追加・移動するときは同じ階層の`_meta.js`、相互リンク、README、Contextを同じ変更で更新します。

## ローカル開発

標準環境はWindows、WSL2 Ubuntu、VS Code、Devboxの組み合わせです。リポジトリはUbuntu側で開き、npmなどのプロジェクトコマンドはDevbox内で実行します。

```sh
devbox shell
npm ci
npm run dev
```

Windowsのブラウザから`http://localhost:3000`へアクセスします。ビルド確認:

```sh
npm run build
```

これらのcommandは人間がローカル開発環境で作業する場合の手順です。ChatGPT経由で作成した成果物のbuild・testはChatGPT上で実行せず、PR作成後のGitHub Actionsで検証します。作業branchのcommit数を一つに揃える必要はありません。

環境構成、依存関係の管理、Web・APIの結合確認は[ローカル開発環境](./content/local-development.mdx)を参照してください。

## 最初に読む資料

1. [初回Releaseの範囲と成功条件](./content/first-release.mdx)
2. [Media](./content/media/index.mdx)・[Community](./content/community/index.mdx)・[User](./content/user/index.mdx)
3. [Media関連ユースケース](./content/media/use-cases.mdx)
4. [ユビキタス言語](./content/ubiquitous.mdx)
5. [リポジトリ構成](./content/system/index.mdx)
6. [非機能要件](./content/system/cross-cutting/non-functional-requirements.mdx)
7. [ドキュメント管理方針](./content/documentation-policy.mdx)
8. [Context map](./content/context/index.mdx)
9. [ローカル開発環境](./content/local-development.mdx)
10. [人間中心のAI支援開発](./content/ai-development.mdx)
11. [アジャイル開発とIssue棚卸し](./content/development-process.mdx)
12. [ブランチ運用](./content/branch-strategy.mdx)
13. [コミットメッセージ規約](./content/commit-message.mdx)
14. [バージョニング規約](./content/versioning.mdx)

User登録、Auth0認証、nickname、session、account削除を扱う場合は、[User設計](./content/user/index.mdx)を確認してください。

Community、参加申請、招待URL、Administrator、共有、Uploader権限を扱う場合は、[Community設計](./content/community/index.mdx)、[Communityユースケース](./content/community/use-cases.mdx)、[Community権限](./content/community/authorization.mdx)を確認してください。各Product domainの標準構成と正本の所有境界は[ドキュメント管理方針](./content/documentation-policy.mdx)を参照してください。

Mediaの派生画像・非同期処理を実装する場合は、[Media処理と派生物](./content/media/processing.mdx)、[非同期Media処理](./content/system/api/asynchronous-processing.mdx)、[Transactional Outbox](./content/system/api/transactional-outbox.mdx)、[Media表示と配信](./content/system/web/media-delivery.mdx)も確認してください。

資料は日本語で記載し、設計と実装の差異を発見した場合は推測で解消せず、IssueまたはPRで報告します。
