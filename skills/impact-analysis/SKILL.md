---
name: impact-analysis
description: Memoriaの各Repositoryの具体的な変更案・PR差分について、現行のSource of Truthと実コードに基づき直接・間接Consumer、横断的な契約、回帰リスク、必要な検証と要合意事項を影響の確実性を区別して分析する。
---

# Impact Analysis

## 目的と適用条件

Memoriaの**具体的な変更案、変更予定の公開Contract、実際のdiff / PR**が、既存Consumer・API・Data・Behavior・Story/Test・運用境界へ与え得る影響を調べるときに適用します。全Repositoryを対象とし、FrontendのStory/Media DetailやWeb/APIのGraphQL契約を初期検証の題材とします。

**変更点 → 影響対象 → 維持すべきContract → リスク → 検証方法・未確認 → 要合意事項**を、対象の現在の実装と正本に結び付けて説明することがGoalです。変更案がまだ確定していなければ、仮定と条件を明示して暫定的に分析します。影響分析そのものは、変更案の承認、実装方針の確定、変更作業やテストの実行、Quality Gateの合否を意味しません。

単に現行構造を知りたい、実装の所在地を確認したい、仕様間の一致を監査したいだけなら、その目的に対応する調査へ留めます。変更のない状態に無理に仮想diffを作りません。小さな変更へ大規模なImpact台帳・固定JSON・全Repository探索・独立の必須Gateを課しません。

## Source of Truthと隣接Skill

- [Context map](../../content/context/index.mdx)、[AI支援開発](../../content/ai-development.mdx)、[開発プロセス](../../content/development-process.mdx)：参照順序、判断と人間の合意、Issue/PR/操作権限。
- 対象Repositoryの現在の`AGENTS.md`、対象branch/commitの正本・コード・設定・schema・生成物・Story/test/CI、関連Issue/PRが所有するContract。Frontendなら[Frontend UI設計・開発方針](../../content/system/frontend-ui-development.mdx)、[Frontend実装規約](../../content/system/web/implementation-conventions.mdx)、[Frontendテスト戦略](../../content/system/web/frontend-testing.mdx)を必要な範囲で参照します。他領域ではそのRepositoryと設計Ownerの正本を取得します。
- [Task Context Resolution](../task-context-resolution/SKILL.md)：依頼のGoal/Scope、base/head/Issue/PR、指示・操作許可を確認。
- [Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)：影響調査に必要な正本と実コードの所在・本文を特定。
- [Codebase Investigation](../codebase-investigation/SKILL.md)：現在のEntry、Consumer、State Owner、呼び出し・依存・副作用の**現状を解明**。本Skillは**指定変更案からの波及・回帰リスクと検証範囲**を分析。実コードの追加readはその場で行ってよく、必ず別工程を挟む必要はありません。
- [Component Refactoring](../component-refactoring/SKILL.md)：既存Frontend契約を維持しながら、合意済みの責務抽出・変更実装と変更前後の回帰検証を担う。本Skillはその分析入力になり得ますが、形式的な必須Gateを追加しません。
- Cross-Repository Contract Analysis（未導入候補）は**変更案がなくても**Repo間の現行契約整合を調べる領域。変更予定のAPI/SchemaがWeb/APIへ与える波及は本Skillで扱います。
- Specification Consistency Review（未導入候補）はSpec/Issue/Code/Testの**現時点での整合**の監査。Regression Review / Test Design（未導入候補）は具体的なテストの設計・実行・結果検証。本Skillの影響予測はそれらの代用ではありません。

このSkillに正本規約の本文を複製しません。Skillの取得・適用はGitHub write、テスト実行、PR、merge、Releaseの許可を付与しません。

## 入力・着手条件

- 何をどのように変更する案なのか。予定または既存diff、変更前後のContract、明示的に合意した例外、不変条件、Scope/対象外。
- 対象Repository、比較するbase/headとcommit、関連Issue/PR、Owner Documentと重要なConsumer、調査・検証・GitHub writeに関する許可。
- 変更起点の種別（UI/Component/Public API/Story ID/GraphQL Schema/Operation/生成物/DB/Authorization/Infrastructure等）。

不明な点はreadで解消します。複数の実現案がある場合はそれぞれの条件付き影響として扱い、未合意の仕様変更を既定案へ織り込みません。比較できないbase/headや最新の対象変更を推測で埋めません。

## 実行手順

### 1. 最新の変更基準を固定する

1. 有効なGoal/Scope、Issue/PR/branchの最新状態、明示的な仕様変更の許可、read-only等の操作権限を確認します。過去の会話・Issueの古いpath、コード断片、行番号を現行実装と見なしません。
2. 対象base/head（必要ならcommit SHA）で実際のdiffと周辺本文をreadします。まだdiffがない提案なら、どのPublic Contractや処理・利用元を**変更する想定か**を明記します。変更点が不明確で結論が変わる場合は条件分岐と確認事項を提示して停止します。
3. 変更前のSource of Truthにある不変条件（Consumerの既存機能、見た目/操作、Security/Auth、Schema互換性等）と、合意済みの変更例外を分離します。

### 2. 変更点から影響先を追跡する

1. 直接の利用元・export/Caller/Consumerから、必要な範囲で間接依存、Dynamic/Runtime経路、State Owner、Async/Side Effect、Navigation/URL、Cache/Storage、Cross-Repository interfaceへ追います。**import存在、名称類似、GraphQL generated type、Storyの存在だけから実際のRuntime影響を断定しません**。
2. 画面/Component変更ならProduction/Prototype/Storybook等のConsumer固有のProps/slot/composition、Visual/Behavior/State/Responsive/Accessibility、Focus/Scroll/Loading/Error/RetryのContractを確認します。共通化や新Consumer追加を理由に既存ConsumerのCapabilityを落としません。
3. Story名・ファイル・`meta.title`・export・CSF IDを変更するときは、Storybook indexやInteraction/VRT、snapshot/baseline、LinkやCI指定の参照への波及を調べ、画面挙動の不変条件を別に保持します。
4. GraphQL/API/Storageなどを変更するときは、各RepositoryのSchema/Operation/Resolver/Client/Generated types/Mock/Cache/Authorizationと、互換性・Migration/Deployment/rollback等、変更内容に関係する所有契約へ追います。対象Repositoryの正本やコードが未取得なら、互換性を保証しません。
5. **影響がない**と判断する範囲も、どの経路・refを調べ、どの前提で影響がないと言えるかを残します。全Consumerを見ていないなら「全体に影響なし」とは言いません。

### 3. Contract・リスク・検証の紐付け

1. 影響ごとにEvidenceを分類します：**confirmed**（具体的diff・参照/契約によって波及を確認）、**conditional**（変更案・Config・Runtime経路や互換性条件に依存）、**unknown**（本文未取得・経路不明・動作未検証）。**リスクの可能性を、すでに不具合が発生したという事実と混同しません**。
2. 影響に関係する契約だけを選びます：Visual/Behavioral/Responsive/Accessibility、State/Async/Error/Retry、Router/URL、API/Schema/Cache、Authorization/Secret、DB/Infrastructure/Deploymentなど。既存Contract（`intended`）、現行の実装（`actual`）、意図的な仕様変更を区別します。
3. 各Contractに必要な検証を対応付けます（Unit/Hook、Storybook Interaction、VRT、Integration/E2E、Typecheck/Build、Schema/Generated types、Auth/Contract Test、MigrationやHuman Visual Review等）。テスト対象外のギャップを明示します。**テストが存在すること、CIの緑、VRT成功だけでは全Contractの同等性を意味しません**。既存CI結果の評価が必要な場合は対象HEAD SHAを確かめます。
4. 変更規模とリスクに見合う粒度で検証を提案します。根拠のない「全テスト必須」や影響経路のないチェックを追加しません。調査だけの依頼ならテストを実行しません。

### 4. 合意が必要な変更と停止条件

既存Consumerの機能省略、仕様・表示・操作・Public APIの重要変更、破壊的Schema/DB変更、AuthorizationやSecretの扱い、Story IDの変更と回帰baselineの不連続など、重要な判断が必要な場合は、**選択肢・比較・維持すべきContract・リスク・推奨と未確認**を示し、人間の合意前に変更を決定・実装しません。

調査対象の重要なファイルが取得できない、旧Issueと最新diffが矛盾する、CIの対象commitがずれている、複数Repoで片側しか確認できない場合は「未確認」を明示して重要な結論を保留します。結果不明のwriteが存在するなら再実行せず、最新状態をreadして重複を避けます。

### 5. 調査結果の引渡し

規模に応じて、会話・既存Issue/PRの許可された場所へ次を報告します（固定の表・ドキュメントは必須でない）。

- **対象**：Goal、提案変更・diff、Repository/base/head/commitと取得した正本・ファイル・確認対象外。
- **影響の連鎖**：`変更点 → 直接/間接対象 → Contract → リスク → 必要な検証`。confirmed / conditional / unknownと、影響なしの根拠。
- **未解決事項**：要合意の仕様判断、互換性・リスク、追加readの対象、検証未実施、実行できない理由。
- **引渡し先**：実装やRefactoring、専門的なCross-Repository/Specification Review、Test Design/Regression、PR Review等への必要な情報。既存正本の修正が必要なら別途権限・合意を確認する。

## 完了条件・非責務

- 変更案の範囲と最新比較基準が明確で、重要なConsumer・Contractの影響を調べ、根拠水準と検証の必要性・残る不確実性を説明できた。
- 意図・現行実装・確認済み影響・条件付きリスク・未検証を区別し、誤った「影響なし」や「検証合格」宣言をしていない。
- 読み取り専用ならbranch/commit/PR/merge・コード変更・テスト実行を行わない。変更や実行が別途許可された場合も操作権限ごとに判断し、結果をSource of Truthから再取得して反映を確認する。
- Impact Analysisは設計判断・変更実施・テスト実行を自動的に要求する必須工程でも、それらを代行するSkillでもない。判断不能な部分を残して次の担当へ引き渡してよい。
