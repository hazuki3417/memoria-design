# AGENTS.md

## このファイルの役割

このファイルは、Memoriaで作業するAI Agentが正しいSource of Truthへ到達するための最小Bootstrapです。Product仕様、設計判断、GitHub運用、開発プロセス、実装規約の本文をここへ複製しません。

詳細な規範は所有する文書を参照し、Taskごとの読み取り順序は `content/context/index.mdx` を使用します。

## リポジトリの責務

`memoria-design` はMemoriaのProduct設計、Architecture、横断的な設計判断のSource of Truthです。

- `memoria-web`: Next.js Web Application
- `memoria-api`: Go GraphQL API、Media Worker、Outbox Publisher
- `memoria-design`: Product / System Design
- `memoria-IaC`: AWS Infrastructure

GraphQL / SQL schema、生成設定、package設定、repository固有の実装規則など実行可能なContractは、所有する実装repositoryをSource of Truthとします。正本の境界は `content/documentation-policy.mdx` を参照します。

## 作業開始時の必須手順

設計、実装、レビュー、調査、Issue整理を開始または再開するときは、次の順で確認します。

1. 最新のIssue、PR、対象branchと、現在のTaskで人間と合意した要求を確認する。
2. `content/context/index.mdx` からTaskに対応する読み取り順序を選ぶ。
3. Domain / Screen / Systemを所有する設計書と、影響する横断設計を確認する。
4. schema、設定、code、test、CIに関わる判断では、所有する実装repositoryの最新状態を確認する。
5. 設計と実装、複数の正本、Task要求の間に差異があれば、推測で解消せず差異を明示する。

過去の会話、AI生成要約、古いIssueやPRだけを根拠に現在状態を判断しません。

## 判断に利用する情報

情報の優先順位と矛盾時の扱いは `content/context/index.mdx#情報の優先順位` を唯一の定義とします。このファイルや他のAgent向け文書へ別の優先順位を定義しません。

設計文書は intended behavior、実行可能なschema・設定・code・testは actual behavior / executable contract を表します。両者が矛盾する場合は、一方を自動的に優先して変更せず、差異を確認して必要な判断を人間へ求めます。

## AI Agentの行動規範

人間が開発主体かつ最終判断者です。AI Agentの姿勢、専門的Feedback、対話、合意後の実行、安全境界、GitHub連携の規範は `content/ai-development.mdx` をSource of Truthとします。

特に次を守ります。

- 重要な設計判断や不可逆な変更を勝手に決定しない。
- 人間の案へ受動的に同意せず、risk、矛盾、trade-off、過剰設計を評価する。
- 合意した長期的な判断は、許可された範囲で所有するSource of Truthへ実際に反映する。
- 未解決の課題はIssueで管理し、設計本文へ未決定事項を採用済み仕様として混在させない。
- write操作の結果が不明な場合は同じ操作を再実行せず、最新状態をreadして確認する。
- write後はSource of Truthを再取得し、変更が実際に反映されたことを確認する。

## GitHub変更操作

branch、commit、PR、merge等の具体的な運用は `content/branch-strategy.mdx`、AI Agentによる操作許可と標準workflowは `content/ai-development.mdx` をSource of Truthとします。変更操作の前には `content/context/index.mdx#github変更操作の事前確認` を適用します。

PRのmerge、Release、本番環境への操作など、追加の明示的許可が必要な操作へ承認範囲を推測で拡張しません。

## 設計・実装変更

文書の配置、所有、記載粒度は `content/documentation-policy.mdx` と `content/design-document-templates.mdx`、開発プロセスとDoneの基準は `content/development-process.mdx` を参照します。

既存実装のComponent化、責務分離、共通化、refactoringでは、明示的な仕様変更の合意がない限り、既存の仕様、表示、layout、interaction、state表現、Responsive Behaviorを不変条件として扱います。Task固有の実装規約はContext mapから対象repository / SystemのSource of Truthへ到達して確認します。

## Contextを変更するとき

Agent向けContextを追加・変更するときは、同じ規則を複数箇所へ複製しません。

- `AGENTS.md`: Bootstrapと参照経路だけを所有する。
- `content/context/index.mdx`: Task routingと情報優先順位だけを所有する。
- `content/ai-development.mdx`: AI支援開発の行動規範を所有する。
- `content/development-process.mdx`: Iteration、Issue、Ready / Doneを所有する。
- `content/branch-strategy.mdx`: branch / PR / merge運用を所有する。
- `content/documentation-policy.mdx`: 文書のSource of Truth境界と配置を所有する。
- Domain / Screen / System文書: Product / System仕様そのものを所有する。

新しい規則を追加する前にownerを一つ決め、他の入口からはlinkだけを追加します。時点依存の進行状況や一時的なBaselineを恒久的なBootstrap規則へ混在させません。
