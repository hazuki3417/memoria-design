---
name: task-context-resolution
description: Memoriaの作業開始・再開・依頼変更時に、最新の人間の指示とGitHubのIssue・PR・branchを照合し、Goal・Scope・許可範囲・未確認事項を後続作業へ引き渡す。
---

# Task Context Resolution

## 目的と適用条件

Memoriaの設計・調査・実装・レビュー・GitHub操作を**開始・再開**するとき、または依頼、Scope、担当、操作権限が変わるときに使います。現在のTaskに必要な事実と合意済み事項を確定し、未確認・矛盾・要合意事項を区別して後続の判断に渡します。読み取り専用の依頼にも適用できます。

このSkillは新たな工程ゲート、永続化するTask台帳、独立Agent間プロトコルではありません。**既存規約にない操作許可を与えず、質問だけの依頼にGitHub書き込みを追加しません。** 状況が変わっていなければ形式的な再確認を繰り返さず、作業規模に応じて要約します。

## 参照先と所有責務

1. [Context map](../../content/context/index.mdx)：Task別の読み取り順序、情報の優先順位、正本へのrouting。
2. [AI支援開発](../../content/ai-development.mdx)：作業開始・判断・実行、Goal・Scope、確認の分類、操作許可、中断後の再開。
3. [開発プロセス](../../content/development-process.mdx)：Issue・PR・正本への記録、GitHub変更と対話型作業の境界。
4. 対象Repositoryの最新`AGENTS.md`、Issue・関連PR（Open / Closed / Merged）・branch、および必要なOwner Documentと実装Contract。

リンク先の内容はSkill本文へ複製しません。各Repositoryの現在の事実は実際のGitHub readで確認します。情報が食い違えば[Context mapの優先順位](../../content/context/index.mdx)を参照し、重要な未合意事項を推測で解決しません。

## 責務境界

**このSkillが行うこと**：依頼のGoal・Scope・不変条件、対象RepositoryとTaskの関連Issue・PR・branch、合意済み判断、操作単位の許可、根拠・未確認・矛盾を整理し、次の作業に必要なContextを示す。

**このSkillが決定・実行しないこと**：

- branchの選択・命名・作成・切替は[Branch Management Skill](../branch-management/SKILL.md)と[ブランチ運用規約](../../content/branch-strategy.mdx)。
- Owner Documentやcodeの正本を探索する具体的な手順はContext mapと対象Repositoryの入口。
- commit / PR / Issue更新・merge等の実操作は各正本と個別の許可に従う。
- 中断による結果不明writeの具体的な復旧はAI支援開発の運用規約に従う。本Skillは結果不明という状態を引き渡す。

Task Contextは他Skillの確認を省略させる**権限証明書ではありません**。後続操作の直前に対象・許可・最新状態を必要に応じて再照合します。

## 実行手順

### 1. 依頼と合意を分けて整理する

1. 最新の人間の指示と現在有効な合意を読み取り、達成したい**Goal**と変更する**Scope**、変更してはならない仕様・Contract、受け入れ条件を区別する。過去の提案やAI要約を合意済みの指示に置き換えない。
2. 明示されたRepository、Issue、PR、branch、作業方式（対話型／指定の定義済みプロセス）を整理する。指定がない値は推測で補わない。
3. 作業が新規・既存作業の継続・マージ後の追加変更・結果不明操作からの再開・単なる問い合わせのどれに該当するか、**確定事実と条件付き判断を区別**する。Taskが複数RepositoryへまたがるときはRepositoryごとに関連情報を分離する。

### 2. 最新の状態をreadで照合する

1. 関連Issueとその現在有効なScope・コメント、PRの実際のOpen / Closed / Merged状態・head/base、対象branchの存在と必要な最新commitを確認する。**古いIssueコメントやbranchの存在だけでPRが未マージだと判断しない**。
2. Context mapと対象Repositoryの`AGENTS.md`から必要な正本をたどり、合意済みScope・Contractと実際の状態の差異を把握する。確認対象は依頼に必要な範囲に絞る。
3. GitHub readに失敗した項目は「未確認」と明記する。実際に取得した情報、ユーザー報告、架空の条件、過去の会話を混同しない。

### 3. 許可・衝突・再開条件を分類する

1. 今回の指示から、read、branch作成・切替、commit、PR作成、merge、Release等を**操作ごとに**「許可済み／未許可／確認が必要」に分ける。Skillの存在、既存PR、実装依頼だけから権限を拡張しない。
2. 不足情報がGitHubのreadで解決できるなら自分で取得する。重要なScope・Contract変更やbranch変更など人間の判断が必要な場合は、論点・選択肢・影響を示して合意を求める。
3. 書き込み結果が不明な場合は「結果不明・再write保留」とし、関連branch・commit・PRの最新状態をreadするまでは同じwriteを再実行しない。
4. 後続の作業が安全に進められる範囲と、停止すべき操作・不足事項を分ける。合意済みの小さな実装判断に形式的な承認を追加しない。

### 4. Task Contextを引き渡す

次の軽量な要約を、**判明している項目だけ**会話や作業報告に示します。未該当項目を埋めるために架空の値を作らず、短い依頼では必要な項目だけ簡潔に記します。固定のJSON Schemaや専用ファイルの作成は不要です。

| 項目 | 内容 |
| --- | --- |
| Goal / Scope | 達成したい結果、変更対象・対象外、受け入れ条件・不変条件 |
| Repository / Issue / PR / branch | 対象と関連先、実際に確認した状態。branchの**利用決定**はBranch Managementへ委ねる |
| Task状態 | 新規／継続／マージ後の追加／再開／問い合わせ等と、その根拠 |
| 操作許可 | 操作ごとの許可済み・未許可・要確認 |
| 確定事項（Fact / Agreement） | Source of Truthで確認した事実と、人間が合意した方針を区別 |
| 未確認（Unknown） | 未取得・読み取り失敗・結果不明な情報 |
| 矛盾（Conflict） | 指示、Issue、PR、設計・実装等の不整合と影響 |
| 要合意（Decision Required） | AIが独断で確定しない重要判断、必要な承認 |
| 次のアクション | 進行可能な作業、引き継ぐSkill、保留する操作、再確認条件 |

情報の根拠は必要に応じてRepository・path・Issue・PRへリンクします。一時的なContextを別の正本として保存しません。長期的な決定や進捗の記録先は既存のIssue・Owner Document・PR規約に従います。

## 完了条件

- 現在のGoal・Scope・対象Repositoryと関連作業の状態を、確認した情報の範囲で説明できる。
- 事実・人間の合意・未確認・矛盾・要合意を混同せず、後続作業が進められる範囲と停止条件を示せる。
- 操作許可を個別に扱い、Task Contextの整理のみを理由にGitHub writeを行っていない。
- 後続Skillの責務を代行せず、必要な正本と最新状態の再確認条件を明示している。
