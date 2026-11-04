---
name: component-refactoring
description: MemoriaのFrontend既存Component・Hook・Compositionの抽出・共通化・責務分離・配置変更で、変更前のConsumer固有CapabilityとVisual / Behavioral / State / Responsive Contractを維持し、影響・判断・実装・回帰検証を根拠付きで進める。
---

# Component Refactoring

## 目的と適用条件

Frontendの**既存Component・Hook・Composition**の抽出、責務分離、共通化、移設、Public APIの整理を行うとき、既存仕様と実際の表示・操作・状態・Responsive Behaviorを維持するために適用します。既存実装のリファクタリング案の調査・レビューだけを依頼された場合は、必要な読み取り・判断に限定します。

本Skillは、既存契約を維持したまま責務を改善する**実行手順**です。新規UI機能の一般的な開発、単なるファイル検索、仕様の採否、独立した必須工程ゲートを定義するものではありません。**Skillの適用や読み取りだけでは、branch・commit・PR・mergeなどの権限は付与されません。**

## 正本・他Skillとの境界

- [Context map](../../content/context/index.mdx)：対象タスクの参照経路、情報の優先順位、横断的な影響の入口。
- [Frontend UI設計・開発方針](../../content/system/frontend-ui-development.mdx)：画面設計・Prototype・既存UIの回帰防止、Visual / Behavioral / Responsiveの不変条件。
- [Frontend実装規約](../../content/system/web/implementation-conventions.mdx)：Component / Hook / Pure Logic / Compositionの境界、Public API、State Ownership、StoryとTestの配置。
- [Frontendテスト戦略](../../content/system/web/frontend-testing.mdx)：Unit / Hook / Interaction / VRT / E2E等の保証対象と検証階層。
- [AI支援開発](../../content/ai-development.mdx)・[開発プロセス](../../content/development-process.mdx)：重要判断の合意、GitHub操作許可、作業状態・Issue・PRと検証の扱い。
- 対象Repositoryの最新`AGENTS.md`、関連するScreen / Domain / PatternのOwner Document、対象branchのcode・Story・test・関連Issue / PR：具体的な比較基準と今回の変更範囲。

[Task Context Resolution](../task-context-resolution/SKILL.md)はGoal・Scope・不変条件・権限と現行Issue/PR状態を整理し、[Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)は必要な正本と実装を発見・取得します。[Branch Management](../branch-management/SKILL.md)は使用すべきbranchを判断します。本Skillは、**既存Frontend契約の保持を目的とする変更の具体化・実装・検証**に責任を持ちます。Codebase Investigation（候補）は現状構造の深掘り、Impact Analysis（候補）は変更影響の評価、各Review（候補）は独立した検証を扱いますが、未導入Skillの実行を前提条件にしません。

規範・正本を本Skillへ複製せず、適用時点の最新内容を読みます。

## 入力

- 依頼のGoal、変更対象・対象外、明示的な仕様変更と合意、不変条件、操作ごとの許可。
- 対象Repository・branch・関連Issue / PR、変更するComponent / Hook / Compositionと既存Consumer（判明している範囲）。
- 比較する設計正本、実装・Story・Test、利用環境（本体・Prototype・Storybook）と検証条件。

情報が不足するときはreadで解消します。対象branchや比較基準が取得できないこと、重要な仕様差異が未解決であることは、推測で補いません。

## 実行手順

### 1. 作業の状態と変更前の比較基準を確定する

1. 現在有効なGoal・Scope・許可、関連Issue / PRの実状態、対象branch・commitを照合する。過去のIssueや会話が述べる旧実装を現在の事実とみなさない。読み取りだけならbranch/PRを作らない。
2. 対象branchの**最新の実装本文**から、変更Componentだけでなく既存Consumer・呼び出し元・Public API・Hook・State Owner・副作用、Story / Testと利用箇所を必要な範囲で確認する。必要に応じ設計正本・Prototype・本体を照合する。
3. 変更前の保存すべき契約を具体化する。少なくとも変更に関連する**表示要素・情報量・配置・アクセシビリティとフォーカス・操作・enabled/disabled・Loading/Error/Retry・状態遷移・Router/URL/スクロール・非同期副作用・Responsive Behavior**を確認する。無関係な項目まで形式的に全件調査しない。
4. `intended`（採用済み設計）、`actual`（現行実装）、明示的に合意された仕様変更、未確認・矛盾を区別する。合意のない差異は勝手に正規化しない。**Visual Prototypeも回帰防止対象**とする。

### 2. ConsumerのCapabilityを保った責務境界を設計する

1. 変更の目的に対してComponent・Hook・Pure Logic・Composition Root・State Ownerの責務を切り分ける。抽出する共通責務と、既存Consumerに残す固有UI・State・Action・Navigationを区別する。
2. **既存Consumerを新しいConsumerの単純な要件へ合わせない**。共通化しにくいCapabilityはprops、slot、composition、より小さいComponent等で保全し、共通化する範囲そのものを再検討する。
3. 共通ComponentのAPIや見た目を統一することを目的として、既存の情報・操作・状態やResponsive挙動を省略しない。既存Consumerの契約を先に維持して責務を抽出し、その結果を新Consumerでも利用する構成を基本とする。
4. 変更案ごとに影響するConsumer、呼出・import / export、Story ID、Interaction / VRT / E2E、公開API・状態接続と検証対象を整理する。小さい改修に不相応な固定ドキュメントや網羅的な台帳は要求しない。

### 3. 合意が必要な変更で停止する

既存契約の保持が難しい、公開API・Component境界が大きく変わる、Consumer固有Capabilityが欠落する、設計と実装が重要な点で矛盾する、意図的な仕様・表示・操作変更が必要な場合は、**変更前後の差異・選択肢・影響・推奨を説明し、人間の合意を得るまでその変更を実行しない**。

元の実装と異なるUIを「同等」と推定して置換しない。既に合意済みの仕様変更だけは、明示された範囲に限り不変条件の例外とする。一方、合意済みのScopeに収まる小さく可逆的な実装判断には不要な再承認を追加しない。

### 4. 許可された変更を段階的に反映する

1. 適切な作業branch・既存Open PRとの関係とGitHub write権限を確認する。既存の実装・UI・状態表現を維持したまま、変更の影響を追跡できる粒度で抽出・移設し、必要なConsumer・Story・Testの参照を更新する。
2. 抽出・配置変更によってConsumerのProps / Callback、公開export、Router・GraphQL・Error / Pending・Focus / Overlay・Responsiveなどの振る舞いが変わっていないかを随時照合する。
3. 途中で重要な仕様差異・別branchの新しい変更・結果不明writeが見つかれば当該操作を保留し、最新状態をreadして判断する。**結果不明writeを失敗と断定して再送しない**。
4. commit・PR作成・merge・Releaseの権限は別々に扱う。変更依頼から未指示PRやmergeへの許可を推定しない。

### 5. 回帰検証・結果の引き渡し

1. 対象変更に必要な構文・format・lint・型・build、Unit / Hook / Storybook Interaction / VRT / Integration / E2E、Human Visual Reviewを**各検証の役割に応じて**選択する。実行環境・対象commit / branchと結果を区別する。
2. **変更前後の同じConsumer / 画面 / 状態 / Viewport**でVisual / Behavioral / Responsive Contractを照合する。Focus、Overlay、非同期動作、画面遷移、Retry、Scroll等の重要な契約があればその検証も含める。Story IDやFixtureが変わるときはテスト参照の移行と保証の継続を確認する。
3. typecheck・lint・CI成功だけでVisual / Behavior同等性を宣言しない。VRT未撮影、Baseline未承認、Human Review未実施、環境上実行不可の項目は、**未検証**として残す。実コードの確認だけで回帰テストを実行済みと報告しない。
4. GitHubへ書き込んだ場合は最新branch・変更ファイルをreadbackし、実際の反映を確認する。既存のIssue / PRに確定事項・結果・未確認・残課題を記録する。

## 出力・完了条件

タスクの規模に応じ、会話・Issue・PRで必要な範囲だけ次の情報を示します。専用の固定JSONや比較表ファイルは必須にしません。

- **比較基準**：Repository / branch / commitと取得済みのcode・Story / Test・設計正本、未取得の情報。
- **保存する契約**：ConsumerごとのVisual / Behavioral / State / Responsiveと固有Capability、明示的に合意した変更例外。
- **変更と判断**：抽出する責務と残す責務、影響対象、重要な要合意事項・停止条件。
- **検証Evidence**：実施した検証と対象commit、変更前後の比較結果、未実施・失敗・未確認事項。
- **反映状態**：許可済みGitHub変更と再readで確認した結果、次のアクション。

読み取り・設計だけの依頼では分析結果を示して終了します。実装依頼では、**変更目的を達成し、確認可能な範囲で既存Consumerの契約を維持した根拠を示すこと**を完了条件とします。検証できない不変条件を「確認済み」とはせず、実行不能・要合意の項目は完了と分けて報告します。
