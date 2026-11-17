---
name: requirement-analysis
description: Memoriaで曖昧な機能・改善要求や不足する受け入れ条件を扱うとき、User Goalと既存Contractを根拠に要求・制約・Scope・検証可能なAcceptance Criteriaを具体化し、人間との合意と後続設計へ引き渡す。
---

# Requirement Analysis

## 目的・適用条件

ユーザーの依頼や改善案に対して、**誰の何の問題を解決し、何を満たせば達成と判断できるか**を明確にする。曖昧なUser Goal、複数の解釈、既存仕様との衝突、Acceptance Criteriaの不足等があるとき、要求・制約・不変条件・Scope・未決定事項を整理し、設計・実装・検証へ引き渡せる粒度に具体化する。Repository・技術を限定しない。

Goal、合意済み要求・Acceptance Criteria、不変条件が十分明確な小さな修正、単なるTask状態の問い合わせ、実現方法のみの比較、実装済み成果物のレビューに、要求分析を機械的に追加しない。本Skillは**既存の対話型開発を固定工程へ変えず**、新たな要求正本、テンプレート、承認Gate、GitHub操作権限を定義しない。要求の分析・候補提示と、**人間による要求の確定**を分離する。

## Source of Truth・隣接Skillの責務

- [AI支援開発](../../content/ai-development.mdx)：Goalと手段、専門的なFeedback、重要判断の合意、許可範囲と正本への反映の原則。
- [Context map](../../content/context/index.mdx)：Product Goal・Domain・Screen・Systemと規約の参照経路・優先順位。[開発プロセス](../../content/development-process.mdx)：IssueのGoal / Scope / Acceptance Criteria / Evidence、成果条件の判定方法。[ドキュメント管理方針](../../content/documentation-policy.mdx)：合意済み要求・設計を所有する文書。
- 対象Repositoryの最新`AGENTS.md`、Owner Document、関連Issue / PR、必要なschema・code・test等は、それぞれ合意内容・意図する仕様・実装上の現状を示す根拠。過去の会話やIssue本文だけで現行契約を確定しない。
- [Task Context Resolution](../task-context-resolution/SKILL.md)は最新依頼・合意・Task状態・操作許可、[Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)は関連正本の発見・本文取得、[Codebase Investigation](../codebase-investigation/SKILL.md)は現行コードの責務・振る舞いの調査。本Skillはその根拠を用いて**要求と達成条件**を具体化する。
- [Design Decision Analysis](../design-decision-analysis/SKILL.md)は重要な実現案とtrade-offの評価、[Impact Analysis](../impact-analysis/SKILL.md)は具体的変更の影響・回帰リスク。Architecture Design / Screen Design（候補）は責務構成・画面仕様の具体化、Test Design（候補）はどのテスト層でContractを保証するか。本Skillは方式の採否、詳細設計、テストの実装・実行を代行しない。
- [Feature Implementation](../feature-implementation/SKILL.md)は**合意済み**要求の実装と既存Contractの保全を担う。要求分析で追加した未合意の案を、実装対象として自動採用しない。

関連Skillの一括・逐次実行を必須にせず、Taskの論点に必要な参照・分析だけを行う。

## 入力と不変条件

- 最新のユーザーの依頼・利用者・業務背景・達成したいValue、既知のUse Case、明示された制約・優先順位・対象外。
- 対象Repository、Issue・PR・branchの現在状態、過去の合意、Product Goal、対象のOwner Documentと既存の機能・非機能Contract。
- 受け入れ条件の現状、未解決の要求・依存・矛盾、今回の調査と書き込みの許可範囲。

既存仕様の変更が合意されていなければ、利用者の既存Capability、UIのVisual / Behavioral / State / Responsive、API・認可・データ整合性等の対象Contractを維持条件として扱う。変更を要する候補は**要合意**とし、情報不足をAIの想像で埋めない。最新の正本が必要なら実際にreadし、取得できなかった部分を未確認とする。

## 実行手順

### 1. Goalと問題を明確にする

1. 利用者、場面、現在の困りごと、期待するOutcomeを整理し、ユーザーが指定した手段（共通化・特定のUI・技術等）と本来の目的を分ける。根拠なしに別の目的へ読み替えない。
2. 要求が曖昧な場合は成立し得る解釈を仮説として示し、Goal達成に影響する違いを明らかにする。読み取れる範囲を先に分析し、質問だけで作業を停止しない。

### 2. 現在の合意・契約を照合する

1. Task Contextと[Context map](../../content/context/index.mdx)に従い、必要な最新のIssue・PR、合意済み要求、Owner Document、実コード・Contractを取得する。意図する仕様と現在の実装、今回の提案を混同しない。
2. 守るべき既存の機能・表示・状態・権限・データ/互換性Contractと、合意済みの変更例外を区別する。根拠が矛盾する場合は変更の採否を推測で決めず、矛盾と影響を示す。
3. 正本が取得できない場合は**確認済み／仮説／未確認**を分離し、結果がその正本に依存する要求は確定を保留する。代替read・対象絞り込みはSource of Truth Discoveryに従う。

### 3. 必要な要求・範囲へ分解する

1. Goalに必要な利用者・Trigger・主要Use Case、正常・失敗・復旧、機能的要求、関連する非機能制約を**リスクと規模に応じて**整理する。不要な分類を機械的に増やさない。
2. In Scope / Out of Scope、変更しない既存Contract、前提・依存・段階分割の必要性を明確にする。未確認の将来要件・提案を今回のScopeへ暗黙に加えない。
3. 合意済み要求、既存正本の要請、AIが提案する要求候補、未確認の前提を区別し、優先順位をAIだけで確定しない。

### 4. 検証可能なAcceptance Criteriaにする

1. [開発プロセス](../../content/development-process.mdx)に従い、**第三者がEvidenceからYes / Noを判断できる成果条件**へ具体化する。「適切」「十分」などの主観語だけを完了条件にしない。
2. 必要に応じて対象・前提/入力・操作/イベント・期待結果・異常/復旧・非影響範囲を示し、Goal・要求・保持Contractとの対応を追えるようにする。実装手段、Component数、API技術等を根拠なく要求の条件へ固定しない。
3. 性能閾値・UX内容等が未合意なら**候補**として示し、測定方法と合意事項を分離する。Acceptance Criteriaを記述したことを、テスト実行・機能達成・実装完了のEvidenceにしない。

### 5. 不足・矛盾・重要判断を整理する

1. GitHubのreadで解消できる事実は取得する。重要なScope変更、利用者に見える振る舞い変更、Public Contract・認可/データ等の判断は、選択肢・影響・条件付き推奨を示し、人間の合意を得るまで確定しない。比較が中心ならDesign Decision Analysisへ引き渡す。
2. 優先順位・意味の異なる解釈・観測方法など、決定に必要な質問を絞る。人間の回答がない場合でも、仮定した要求案と未決定点・判断保留の影響を提示できる。

### 6. 合意状態を分けて引き渡す

作業規模に応じ、Goal / Value、主要Use Case、要求と制約、Scope/対象外、保持Contract、Acceptance Criteria、Evidence・未確認、要合意、次の設計・実装・検証を必要な粒度だけ報告する。固定の書式・専用の要求台帳は作らない。

- **合意済み**と**提案中**、**確認済み**と**未確認**、**分析完了**と**要求確定**を区別する。正式な要求・設計の決定は人間が行う。
- 合意を得た長期的な判断は所有するOwner Documentへ、Task固有の範囲・AC・進捗はIssue等へ、既存の操作許可に従って反映し、GitHubから再取得して確認する。読み取り専用の相談ではwriteしない。
- 要求確定前でも、根拠ある候補・残る判断・保留条件を後続作業へ引き渡せる。要求の決定、実装、テスト、レビューはそれぞれの責務・許可に従う。

## 完了条件

- User Goalと指定された手段を区別し、必要な要求、今回のScopeと対象外、維持すべきContractを根拠に沿って説明できる。
- 成果条件が第三者のEvidenceで判定可能な粒度か、未合意・未確認のためまだ確定できない部分を明示できる。
- 重要な仕様・優先順位の変更をAIだけで確定せず、合意済み／提案／未確認と、今できる作業・保留すべき変更を分けられる。
- 他Skillの設計・実装・検証責務、既存のSource of Truthと操作権限を変えず、新たな必須Gateや未許可のGitHub writeを導入していない。
