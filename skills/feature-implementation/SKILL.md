---
name: feature-implementation
description: Memoriaの合意済み機能を実装するとき、最新の所有規約と参照実装の共通責務・固有差異を変更へ反映し、命名・配置・Consumer・Testの追従と既存Contractを検証する。
---

# Feature Implementation

## 目的・適用条件

**合意済み要件・設計に基づく新規Feature実装、既存Featureへの機能追加・振る舞いを合意どおりに改修する作業**に適用する。対象RepositoryをFrontendに限定せず、Web/API/IaC等のOwner Document・実装契約と各Repositoryの開発方式に従う。最初の評価事例にはProfile/PreferencesなどFrontendの変更を用いる。

特に**規約を読んだのに実装に適用しない、類似実装を参照したのに対応する責務が揃わない、ファイル/Directory名や配置・依存先の更新を見落とす**失敗を、実装前から実装後までの作業判断で防ぐ。

本Skillは実装を進めるための再利用手順であり、要件・規約・Architectureの新たな正本、すべてのTaskへ課す新規Gate、Issue/PR/merge権限の付与元ではない。読み取りや設計相談だけの依頼には実際のコード書き込みを加えない。

## Source of Truthと他Skillの責務境界

- [Context map](../../content/context/index.mdx)：タスクに必要な正本への読み取り経路、情報の優先順位、操作前の確認。[AI支援開発](../../content/ai-development.mdx)・[開発プロセス](../../content/development-process.mdx)：合意、実装・検証・Issue/PR・許可の規定。
- 実装対象Repositoryの**現在の**`AGENTS.md`、実装規約、対象のOwner Document、Schema・設定・code・Story/Test、最新Issue・PR・branchがそれぞれの設計/実装契約と今回のScopeの根拠。Frontendでは[Frontend UI設計・開発方針](../../content/system/frontend-ui-development.mdx)、[Frontend実装規約](../../content/system/web/implementation-conventions.mdx)、[Frontendテスト戦略](../../content/system/web/frontend-testing.mdx)を影響範囲に応じて読む。API/IaC等ではその領域の正本を使用しFrontend規約を無差別に適用しない。
- [Task Context Resolution](../task-context-resolution/SKILL.md)はGoal・Scope・権限、[Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)は必要な正本の発見・本文取得、[Branch Management](../branch-management/SKILL.md)は使用branchの選択を扱う。
- [Codebase Investigation](../codebase-investigation/SKILL.md)は実コードの責務/呼出経路の深掘り、[Impact Analysis](../impact-analysis/SKILL.md)は変更案からのConsumer波及・回帰リスク評価を扱う。必要な範囲だけ併用し、常に全Skillの逐次実行を必須としない。
- [Component Refactoring](../component-refactoring/SKILL.md)は**既存Frontend Component/Hook/Compositionの抽出・共通化・移設を、既存Visual/Behavioral/State/Responsive Contractを維持して実行**する。実装依頼の中心がこれに該当する場合は同Skillを主に適用し、本Skillの名目で既存ConsumerのCapabilityやレイアウトを簡略化しない。
- [Code Review](../code-review/SKILL.md)は変更成果物の**独立した品質評価**。本Skillの実装中・実装後の自己照合はCode Reviewの代替ではない。[Specification Consistency Review](../specification-consistency-review/SKILL.md)は仕様と成果物の双方向の意味的照合を扱う。
- React固有のHook/Component/Pure Logicの細かな実装技法、GraphQL、Error/State、Quality Gate等について本Skillに新しい規範を複製せず、対象正本と将来の専門Skillに委譲する。

## 入力・不変条件

1. 人間が合意したGoal・機能要件・Acceptance Criteria・対象外、保全すべき製品仕様・既存Contract、レビュー対象・既知リスク。
2. 最新Issue・PR・base/head・branch、対象Repository、既存の類似FeatureとそのConsumer、今回許可されたread/branch/commit/PR/merge等の**操作単位の範囲**。
3. 適用する最新Owner規約の本文。適用対象（新規/変更部分・既存の非変更部分）、規範強度・例外条件を具体的に読み、規約導入時点・変更Scopeと矛盾しないことを確認。

対象の仕様・重要な責務境界が未合意の場合は、代替案・影響・判断が必要な範囲を示して確定前の書き込みを止める。単なる実装上の小さな判断には形式的な承認を追加しない。作業途中でTask・branch・規約が変わったら必要な範囲を再取得する。

## 実行手順

### 1. 実装前：正本・参照実装・変更範囲を揃える

1. 現在のTaskと実際のIssue/PR/branch・許可範囲をGitHubから確認する。実コード・規約の正本は対象の最新branchから取得し、過去の会話・古いPR本文だけで構造を確定しない。
2. **実装に直接関係する規約本文**を取得し、変更する宣言・Module・API・Testに対して何を適用するか確かめる。例えばWebの関数形式を選ぶ場合も、アロー関数の標準・例外はその時点の規約を読み取って判断し、Skillの記憶上の規則へ依存しない。規約や例示コードに不一致があれば、どちらかを独断で採用しない。
3. 指定された参照Featureがある場合はその**現行コード本文**を取得する。指定がなければ変更目的に合う近傍の実装を必要な数だけ選び、**対応する責務・Public Contract**（例えばEntry、外部接続、State Owner、View、API境界、Test）と、**Domain・状態・権限・振る舞いによる固有差異**、**参照側に残る規約違反や負債**を分ける。参照元にあるだけで規約違反や旧設計を引き継がない。
4. 作業開始時点のファイル・Directoryの役割と最終形の候補、依存方向、公開入口、直接/間接Consumer、Story/Test、変更前後の保証を必要な範囲で整理する。Directory数を機械的に合わせたり、根拠のないComponent分割を要求しない。
5. 合意済み要件から必要な実装・検証を小さく区切る。重要なAPI/State Owner/仕様変更や大きな設計境界の選択肢がある場合は合意後に実装する。

### 2. 実装中：規約・構造・契約を変更へ反映する

1. 既存の公開契約・状態・振る舞いと、新しい受け入れ条件を維持してコードを変更する。変更部分の関数・Component・Hook・Factory・Adapter、Error/Loading/Retry、Schema/IOなどに**最新の所有規約を実際に適用**する。合理的な例外があれば理由を追跡できるようにする。
2. 参照実装と対応する責務を見つけやすい命名・配置・依存方向を選択しつつ、対象Feature固有のState Owner・能力・UI/操作を残す。「似ている」だけで既存の固有Capabilityを削除・簡略化しない。
3. ファイル/Directoryの作成・命名変更・移設・責務抽出では、最終的なownerとPublic APIを明らかにする。**import/export、利用元、生成/設定、Story/Test、Document参照、旧pathの残存**など、変更によって実際に影響する参照を同じScopeで更新する。旧path維持の契約がある場合は削除しない。
4. 変更対象外の旧コードに規約不適合があっても、その理由だけでRepository全体を一括修正しない。今回変更したコードへ必要な規則を適用する。仕様/契約の変更が必要と判明した時点で、影響を説明し合意を得る。
5. 実装途中でも変更対象を必要な範囲で読み返し、局所的に型や表示が成立していても、参照先・構造と上位Goalが達成できているかを確かめる。変更量やcommit数だけで達成を判断しない。

### 3. 実装後：成果物の自己照合とEvidence

1. **要件と差分**：実際に変更したファイルと最終コード、合意済みScope・Acceptance Criteriaを照合する。未実装部分、余計な変更、旧実装への依存、正本と実コードの矛盾を確認する。
2. **規約・比較実装**：変更対象の宣言・コメント・API・State・Test名等について適用規約と例外理由を再照合する。同等責務の参照実装との差異を「必要な違い／不必要な揺れ／参照先自身の問題」に分け、機械的な同型化にしない。
3. **最終構造**：ファイル・Directory名、配置、Public API、import/export、Consumer、Story/Test、rename/移設後の旧参照を確認する。機械的検索で検出できるものと、責務境界の意味的判断が必要なものを区別する。
4. **回帰・検証**：変更前後のVisual / Behavioral / State / Responsive、Accessibility、Data/API契約を、実際の影響に応じて照合する。型・lint・CI・Unitが成功していてもVRT・Interaction・Runtimeの合格とはしない。ChatGPTの環境では実行できない検証を実行したと報告せず、GitHub Actions・人間の確認へ渡す。
5. **独立レビューへの引き渡し**：自己照合で問題がないことを独立Code Review成功の代わりにしない。差分・変更理由・既存Contract・正本・参照実装・検証Evidence・未確認事項・重要な要合意事項を、必要な粒度で引き渡す。

### 4. GitHub書き込み・結果の扱い

Branch・commit・PR・Issue更新・merge等は**毎回その操作に適用される正本とユーザーの明示的許可**に従う。作業の実装を頼まれたこととPR作成・merge許可は同一ではない。保護ブランチへ直接pushしない。

書き込み前に対象Issue/PR/branch・base/head・対象file・許可を確認し、操作結果をGitHubの最新readで実際に検証する。返答が中断・不明なwriteは直ちに再試行せず、状態をreadして重複を回避する。実装範囲外の操作を勝手に進めない。

## 報告・完了の判断

- **達成したGoal**、合意済み要件と変更した実ファイル/契約の対応、変更前後の構造・責務・参照実装との差異を説明できる。部分完了を完了とみなさない。
- **規約適用と配置**について確認した本文・適用対象・例外と、最終のファイル/Directory・Public API・Consumer・Story/Testの追従、未確認範囲を区別して報告できる。
- **Evidence**として実際に読んだコード/差分、実行したTest・CIの結果（存在する場合）、未実行の検証・回帰リスクを分類する。GitHub writeはreadback済みのみ完了と記載する。
- 重要な設計判断・未完了・追加の承認が必要な操作は、ユーザーと適切なIssueへ引き渡す。実装手順の適用を、仕様採否・Independent Review・merge承認へ読み替えない。
