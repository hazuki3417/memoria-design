# Memoria Design

Memoriaを構成する複数リポジトリに共通する、プロダクト設計とアーキテクチャの正本です。ドキュメントサイトはNextraで構築しています。

## このリポジトリに置く情報

- プロダクト概要、要求、ユビキタス言語
- システム構成とリポジトリ間の責務
- Web、API、データベース、インフラストラクチャの設計
- 横断的な開発・テスト・リリース方針
- ADRと長期的な意思決定
- AI contextの索引と読み取り順序

実行可能なGraphQL・SQL schema、コード生成設定、環境設定は、それを所有する実装リポジトリを正本とします。

## 関連リポジトリ

| リポジトリ | 責務 |
| --- | --- |
| [memoria-web](https://github.com/hazuki3417/memoria-web) | Web UIとGraphQLクライアント |
| [memoria-api](https://github.com/hazuki3417/memoria-api) | GraphQL API、ドメインロジック、永続化 |
| [memoria-design](https://github.com/hazuki3417/memoria-design) | プロダクト設計と横断的な意思決定 |
| [memoria-IaC](https://github.com/hazuki3417/memoria-IaC) | AWS CDKによる実行環境 |

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

環境構成、依存関係の管理、Web・APIの結合確認は[ローカル開発環境](./pages/local-development.mdx)を参照してください。

## 最初に読む資料

1. [Media](./pages/media/index.mdx)
2. [Media関連ユースケース](./pages/media/use-cases.mdx)
3. [ユビキタス言語](./pages/ubiquitous.mdx)
4. [リポジトリ構成](./pages/system/index.mdx)
5. [ドキュメント管理方針](./pages/documentation-policy.mdx)
6. [Context map](./pages/context/index.mdx)
7. [ローカル開発環境](./pages/local-development.mdx)
8. [人間中心のAI支援開発](./pages/ai-development.mdx)
9. [ブランチ運用](./pages/branch-strategy.mdx)
10. [コミットメッセージ規約](./pages/commit-message.mdx)
11. [バージョニング規約](./pages/versioning.mdx)

資料は日本語で記載し、設計と実装の差異を発見した場合は推測で解消せず、IssueまたはPRで報告します。
