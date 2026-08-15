# Memoria Design

Memoriaを構成する複数リポジトリに共通する、プロダクト設計とアーキテクチャの正本です。Nextraで公開します。

## 最初に読む資料

1. [Mediaドメイン](./pages/media/index.mdx)
2. [Media関連ユースケース](./pages/media/use-cases.mdx)
3. [ユビキタス言語](./pages/ubiquitous.mdx)
4. [システム全体構成](./pages/system/index.mdx)
5. [ドキュメント管理方針](./pages/documentation-policy.mdx)
6. [ローカル開発](./pages/local-development.mdx)

システム設計は全体構成、Web、API、データ・ストレージ、インフラストラクチャ、横断設計の順に整理します。実行可能なGraphQL・SQL schema、設定、commandは所有する実装リポジトリを正本とします。

## ローカル開発

Windows、WSL2 Ubuntu、VS Code、Devboxを標準とし、Ubuntu側でrepositoryを開き、Devbox内で`npm ci`、`npm run dev`、`npm run build`を実行します。Windowsのbrowserから`localhost`へアクセスします。
