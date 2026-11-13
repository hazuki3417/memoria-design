---
name: code-review
description: Memoriaの変更差分を最新の実装規約、設計・既存Contract、比較すべき実装、変更後の命名・配置・依存構造に照らし、根拠付きの品質問題と未確認をレビューする。
---

# Code Review

## 目的と適用条件

既存PR・変更ブランチ・具体的な実装差分について、**採用済み仕様・実装規約への準拠、コードの責務・構造・命名と配置、既存Consumer契約の維持、レビュー可能性**を評価する際に使用する。Frontend/API/IaC等、各Repositoryの所有規約を適用し、まずFrontendの実装・リファクタリングを代表事例として検証する。変更前の設計相談や現状調査だけなら、それに適したSkillを利用する。

本Skillは**変更された成果物を評価する手順**であり、規約や仕様の新たな正本ではない。独立した必須Gate・固定チェックリストの保管先・GitHubの操作権限を追加しない。読み取り専用レビューで無断修正、commit、PR作成、mergeを行わない。

## Source of Truthと責務境界

- [Context map](../../content/context/index.mdx)：Taskの参照経路と情報優先順位。[AI支援開発](../../content/ai-development.mdx)・[開発プロセス](../../content/development-process.mdx)：レビュー品質、合意、許可、Issue/PRと検証Evidence。
- 各Repositoryの**対象base/headの最新**`AGENTS.md`、実装規約、Owner Document、schema/config/code、Story/Test、CI結果、関連Issue/PRが、それぞれの現行Contract・合意・実装の証拠となる。Frontendなら[Frontend実装規約](../../content/system/web/implementation-conventions.mdx)、[Frontend UI設計・開発方針](../../content/system/frontend-ui-development.mdx)、[Frontendテスト戦略](../../content/system/web/frontend-testing.mdx)を、対象に関係する範囲で読む。
- [Task Context Resolution](../task-context-resolution/SKILL.md)：Goal・Scope・関連Issue/PR・権限の整理。[Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)：適用する規約・設計と実ファイルの発見・本文取得。[Branch Management](../branch-management/SKILL.md)：利用branchの判断。
- [Codebase Investigation](../codebase-investigation/SKILL.md)：現行の依存・State/責務・Consumerの調査。[Impact Analysis](../impact-analysis/SKILL.md)：変更案からの波及先・回帰リスクの分析。[Specification Consistency Review](../specification-consistency-review/SKILL.md)：変更案なしでも行う仕様・成果物の意味的な双方向照合。
- [Component Refactoring](../component-refactoring/SKILL.md)：既存Frontend契約を保持した責務抽出・移設・共通化の**実行**。本Skillはその変更結果をレビューするが、実装・テスト実行や正式な画面三者P1〜P8プロセスを代行しない。必要に応じ隣接Skillの調査結果を利用し、毎回全Skillを形式的に実行しない。

規範本文やフレームワーク別の禁止一覧を本Skillへ複製しない。適用する正本の最新版と変更対象・例外条件を確認する。

## 入力とレビュー範囲

- レビュー目的、変更Scope・対象外・既存Contract、適用する人間との合意・例外、読み取り／修正等の許可。
- 対象Repository、base/head（PR番号・branch・必要ならcommit）、関連Issue、変更ファイルと差分、必要な比較実装・Consumer・Story/Test・CI。
- 何を保証するレビューか（規約準拠、構造、回帰リスク、変更のレビュー可能性等）。必要な範囲は変更規模・リスクから決め、Repository全体の機械的走査や無関係な負債修正を要求しない。

## 実行手順

### 1. 変更と規約の比較基準を確定する

1. 最新のIssue・PR状態と**実際のbase/head・変更ファイル・diff**をGitHubから確認する。PR作成前の変更でも、比較先と現行ファイル本文を確定する。古い会話、Issueのパス、PR本文の説明だけで実差分を確定しない。
2. 対象の`AGENTS.md`と正本から**関係する規定の本文**を取得する。適用対象（新規・変更対象／既存の非変更箇所）、規範強度（必須・原則・推奨等）、例外と理由、今回の合意を整理する。**過去のPRをレビューする場合は、規約変更の時点と対象diffの作成・変更時点を区別**し、現在の規約を過去の変更へ根拠なく遡及適用しない。相反する規定・古い例示コード・曖昧な条件があれば断定せず、Ownerと解決すべき論点を記録する。
3. 差分だけでは判断できない変更後の実ファイル、import/export、Public API、直接Consumer、Story/Testと関連するディレクトリ構造を必要な範囲で取得する。差分に表示されないために問題が存在しないとは判断しない。取得不能なら確認範囲を明示する。

### 2. 変更成果物の実際の品質を照合する

1. **規約準拠**：変更した関数・Component・Hook・Factory、型・import・Error/State、公開APIなどについて、正本の実際の規定と実コードを比較する。例外を認める場合も根拠を確認する。Lintが通ることや参照実装に同じ書き方があることは規約適合の代わりにならない。
2. **類似実装との比較**：「参考にして」と指定された実装がある場合はその最新本文を取得する。指定がない場合も必要なら責務の近いFeature/Componentを少数選び、**共通して維持すべき規約・責務境界**、**Domain・Data/State Owner・権限・振る舞いによる固有差異**、**参照実装自体の改善余地**を分ける。ファイル数・Directoryの機械的同型化や、参照側の負債の無批判なコピーは求めない。
3. **構造・命名・配置**：変更後のファイル・Directory名、意味的Ownerの近さ、Component/Hook/Pure Logic/Compositionの境界、Public API・依存方向、import/exportとConsumer、Story/Testの配置と参照を評価する。rename/移設・抽出で旧名・旧path・不要な重複・用途に合わない命名・孤立した参照が残らないか確認する。実装規約にないDirectoryテンプレートや同名ファイル一式を要求しない。
4. **既存Contract・回帰リスク**：変更前後の重要なUI/Behavior/State/Responsive、Accessibility、Focus/Scroll、Router、Async/Error/Retry、API/Data契約などを、対象とConsumerの実情に応じて比較する。型/lint成功で見た目・操作・Runtimeの維持を断定せず、Story/VRT/Interaction/Integration等の必要な証拠と不足を区別する。
5. **変更のレビュー可能性**：命名・構造から責務と変更理由を追えるか、不要な間接参照・抽象化・重複がないか、導入したテストが何を保証するかを確認する。好みだけの指摘と規範違反・実害を区別する。

### 3. 指摘の妥当性と優先度を確定する

1. 指摘ごとに**対象repo/ref/pathと該当箇所、規約または変更前後のコード本文、何が問題か、具体的影響、改善方向、確信度**を結び付ける。必要なら「必須の違反／契約破壊・不具合の疑い／設計改善の提案／未確認」を区別し、作業規模に見合った優先順位を付ける。
2. 変更前から存在する範囲外の問題、現行規約の合理的例外、意図的で合意済みの差異、単なる命名の好みを「今回の新規違反」に混ぜない。変更が触れたために影響する既存負債は、その関係を説明する。
3. リスクが高いが十分な本文を得られない部分は**未確認**とし、必要な追加read・検証を示す。静的読解、Testの存在、CI成功、実際の実行結果を混同しない。具体的な問題が確認できない場合も「確認した範囲で指摘なし」とし、全体の品質合格を保証しない。
4. 修正が公開Contract・大きな責務境界・製品仕様に影響する場合は、選択肢と影響を提示し人間の合意に渡す。レビューの名目で仕様や実装を独断変更しない。

### 4. 報告と次の作業への引き渡し

規模に応じ必要な情報だけを簡潔に報告する。

- **レビュー範囲**：Repository、base/head・PR、実際に取得した規約・差分・参照実装・Test、取得できない範囲。
- **主要指摘**：具体的根拠・影響・優先度・修正案。特に対象範囲の適用規約、参照構造との整合、変更後の命名・配置・参照漏れを検討したか分かるようにする。
- **検証状態**：静的に確認したこと、GitHub Actionsの実結果（取得時のみ）、未実行のTest/VRT/Human Review等、未確認の残存リスク。
- **次の判断**：対応が必要な指摘・合意が必要な変更・隣接Skillへの引き渡し、許可されていない操作。

必要な指摘がなければ形式的な指摘件数を作らない。専用台帳や固定レポートファイル、独立した承認Gateを一律に作らない。

## 完了・停止条件

- 変更内容と適用規約の**本文**、適切な参照実装、変更後構造・命名・影響するContractを、対象Scopeに必要な範囲で照合した。取得できないものは未確認として区別した。
- 指摘を正本・実コード・差分に結び付け、必須規則と推奨・例外、共通構造と正当なFeature固有差異、静的確認と実行保証を混同しなかった。
- 既存仕様/Contractを無断変更せず、重大な設計判断は合意へ渡した。GitHub writeを行う場合は依頼・規約が**個別に許可**する操作だけとし、書き込み前後に最新状態をreadする。
- Code Reviewの結論をQuality Gateの合格認定やPR merge承認に読み替えない。
