---
name: specification-consistency-review
description: Memoriaの現行の設計・Issue上の合意、Schema・設定・実装・Prototype・Test等について、対象を限定して同じ要求・振る舞いの対応、欠落、矛盾、未確認を双方向に照合する。
---

# Specification Consistency Review

## 目的と適用条件

**指定された機能・保証・受け入れ条件について、現在採用する仕様と関連成果物が同じ意味・制約・振る舞いを表しているか**を確認します。具体的な変更案がなくても、設計・Issue・実装・Schema・設定・Visual Prototype・Testの間で、仕様の欠落、矛盾、反映漏れを調査できます。画面だけでなくDomain・Backend・Infrastructure・Processにも適用します。

出力は「**対象の要求と条件 → 仕様の所有先 → 対応する実装・成果物と証拠 → 一致・不一致・未定義等の判定 → 未確認・要合意・追跡先**」です。文言が同じかではなく、適用対象・数量の単位・状態・権限・例外・失敗時の保証が一致するかを比べます。

一度の依頼で全Repository・全画面・全仕様を網羅することを必須としません。指定された調査範囲の終了と、Product全体の整合性合格は別です。

## 正本と責務境界

- [開発プロセス](../../content/development-process.mdx)の「整合性確認の二層構造」「成果統合時の整合性確認」：実施契機、判定区分、不一致の扱い、Issueへの記録の**規範**を所有します。[Context map](../../content/context/index.mdx)と[AI支援開発](../../content/ai-development.mdx)は参照順序、作業の権限・合意を所有します。[ドキュメント管理方針](../../content/documentation-policy.mdx)は仕様の所有先と記載方針を所有します。本Skillはこれらを変更・複製しません。
- 対象Repositoryの最新`AGENTS.md`、Owner Document、Issue・PR、実行可能Schema・Config・実装・Story・Test・CIが現時点の証拠です。古いIssueの差異報告を現行の不一致として再利用しません。
- [Task Context Resolution](../task-context-resolution/SKILL.md)はGoal・対象Issue/PR/branch・操作権限、[Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)は所有先の発見と本文取得、[Codebase Investigation](../codebase-investigation/SKILL.md)は現行の呼出・状態・副作用を解明します。本Skillは**同じ要求を単位に成果物間の意味の対応を判定**します。必要な実装経路は追加でreadできますが、各Skillを毎回形式的に呼び出す義務はありません。
- [Impact Analysis](../impact-analysis/SKILL.md)は具体的な変更案・diff起点の波及、[Cross-Repository Contract Analysis](../cross-repository-contract-analysis/SKILL.md)はProvider/Consumerの現在の公開・運用インターフェースの整合です。それだけが依頼の対象なら該当Skillを主とし、一般的な仕様監査を強制しません。
- [画面整合性確認プロセス](../../content/context/screen-prototype-implementation-review-process.mdx)は、指定画面群の画面仕様・Storybook/Prototype・本体Webを網羅的に静的比較する**P1〜P8の正式な定義済みプロセス**です。画面三者の全条件・網羅性・工程完了を求める依頼は同プロセスへ引き渡します。工程を説明・適用する際は、**正本の各工程名・実行内容・完了条件を本文で確認**し、例えば逆方向探索の工程を判定整理の工程で代用しません。本Skillの軽量調査をP1〜P8の実施・整合性合格の代わりにしません。
- Test Design、Regression Review、Code Review、実テスト実行、仕様採否・修正の実行、新しい監査Gateや独自台帳の導入は本Skillの責務ではありません。

## 入力と確認範囲

対象の機能・仕様・保証・受入条件、対象Repositoryとbranch/commit、関連Issue/PR、比較する成果物、求められる網羅性と操作許可を確認します。指定が曖昧でも対象を合理的に特定できればreadから進め、結果を左右する不明点だけ確認します。

最初に**同じ対象と適用条件を持つ比較単位**を定義します。例えば「Group一覧の1ページ最大100件」と「同一条件で複数ページ取得する累計上限なし」は別々の単位です。未合意の設計値を実装から新しい要求として作りません。確認できないbranch/Versionや対象外領域は明記します。

## 実行手順

### 1. 現在有効な仕様と現物を確定する

1. 最新の依頼・Issue・PR、対象branch/commit、作業範囲と権限を確認します。現在有効な設計と過去のIssueコメント、未マージ変更、実デプロイ版は区別します。
2. Context mapと各Repositoryの入口から対象のOwner Document本文を取得し、要求の適用対象・条件・期待結果・例外・依存する規定を抽出します。画面・機能固有の仕様で要求が説明できる場合も、**同じ保証に適用される横断Owner Document**があるか確認し、対象と単位・例外を照合します。正本を発見しただけで本文を確認済みとせず、取得できない規定は未確認に残します。仕様に曖昧さや内部矛盾があるなら、それ自体を調査結果として残します。
3. 比較に必要なSchema・Config・実装・Story・Testの**本文**と、必要な利用元や接続経路を対象範囲で取得します。文書リンク、ファイル名、Testの存在だけで内容・実行成功を確認済みとしません。Provider/Consumer契約や画面固有の網羅検証は隣接Skill・プロセスの責務を尊重します。

### 2. 仕様から成果物へ、成果物から仕様へ対応付ける

1. **仕様起点**：各確認単位の要求・受入条件から、対象の実装・Schema・Story/Test等に対応する表現・処理・証拠があるか調べます。通常/Empty/失敗、権限、入力の省略・null、状態遷移など、結果が変わる条件は分けます。
2. **成果物起点**：確認範囲にある実装の分岐、公開インターフェース、Story・Testの期待値から逆にたどり、合意済み仕様と対応するか調べます。**取得した資料で見つからない**ことと、対象全体で仕様が**存在しない**ことを混同しません。
3. 同一要求の関係を「Owner Documentの規定 → Task上の合意・例外 → 実行可能Schema/設定・実装 → Prototype/Story/Testの期待・観測」として追跡します。Issue内の合意をProduct仕様の永続的な正本とみなさず、必要な正本への反映漏れを識別します。
4. 対象外・未取得・調査できなかった部分を明確にし、未検証の実行結果、全Consumer、全Storyや全Testの網羅まで保証しません。

### 3. 根拠の強さを保って判定する

判定区分は[開発プロセス](../../content/development-process.mdx)を正本として適用します。

- **一致**：定義した対象・条件について、取得した仕様と成果物の意味が静的な根拠に基づき一致。必要な動的確認がなければ実行時までの保証にはしません。
- **不一致**：同じ条件に対する期待と実際の表現・挙動の明確な差異を確認。意図した過渡状態か不具合かは別途評価します。
- **未定義**：確認した必要なOwner Document等に規定がないと判断できる場合。探索不足なら**未確認**にとどめます。
- **意図的差異**：関連する現在有効な合意と理由、適用条件を確認できる差異。単なる実装都合や過去の説明だけで正当化しません。
- **ガイドライン上のPrototype表現差**：該当する[Visual Prototype実装ガイド](../../content/system/web/visual-prototype-guidelines.mdx)の条件を確認できる場合に限り区別します。
- **Deferred**：未解消内容、理由、Owner、再検討条件と追跡先を確認したもの。Issueがあるだけで解決済みとはしません。
- **未確認**：必要な文書・実装・経路・Version・Test結果を取得または検証できず判定不能。範囲外であることも明示します。

各判定にRepository・ref・path、対象条件、仕様の根拠と観測した成果物、比較できたこと・できないことを結び付けます。部分的な静的一致を全体の一致へ拡張しません。

### 4. 差異と未確認を引き渡す

不一致・曖昧さ・未定義について、Ownerと関係するGoal/Consumer・影響、追加で必要な本文/静的Validation/Contract Test/Integration/Visual確認を提示します。設計を直す、実装を直す、移行期間を設ける等の選択肢は示せますが、**仕様の優先・変更方針・公開契約の破壊**など重要な判断は人間と合意します。

対象の調査だけが許可されている場合は、Issue作成、正本更新、コード変更、Test実行、branch/commit/PR/merge/Release/Deployを行いません。更新が合意・許可された場合は各Owner Documentと既存Issue/PRに記録し、GitHubから実際の反映を再取得します。別の工程や追加の品質Gateを暗黙に要求しません。

### 5. 結果を報告する

規模に応じ、固定の台帳やJSONではなく次を引き渡します。

- **範囲と根拠**：Goal、対象条件、Repository/ref/path、Owner Documentと現在のIssue/PR、対象外・未取得。
- **対応と判定**：同じ要求について、仕様・成果物・Testとの照合、判定とその証拠。反対方向から発見した未規定の実装も区別。
- **限界**：静的な確認、実Test実行・Runtime・Deployment・網羅性の未確認事項。
- **次の判断**：必要な追加検証、既存プロセス・Skillへの引き渡し、合意・追跡が必要な事項と未許可操作。

## 完了条件

- 指定された範囲の要求と実装・成果物を対応付け、双方向で確認した範囲、差異・未確認・意図的な例外を根拠付きで説明できる。
- 「調査した項目の判定」と「調査対象全体の探索完了・整合性合格」を混同しない。
- 既存の規約・画面プロセス・隣接Skillの責務を置き換えない。未合意の仕様変更や未許可のGitHub writeを行わない。
