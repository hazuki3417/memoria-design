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

```sh
devbox shell
npm ci
npm run dev
```

ビルド確認:

```sh
npm run build
```

## 最初に読む資料

1. [ドキュメント管理方針](./pages/documentation-policy.mdx)
2. [リポジトリ構成](./pages/architecture/index.mdx)
3. [Mediaドメイン](./pages/media/index.mdx)
4. [Context map](./pages/context/index.mdx)
5. [人間中心のAI支援開発](./pages/ai-development.mdx)
6. [ブランチ運用](./pages/branch-strategy.mdx)

資料は日本語で記載し、設計と実装の差異を発見した場合は推測で解消せず、IssueまたはPRで報告します。
