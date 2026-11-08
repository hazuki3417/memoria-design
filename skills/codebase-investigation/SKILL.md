---
name: codebase-investigation
description: Memoriaの各Repositoryで、現行branchの実コード・設定・testを根拠にComponent/Moduleの責務、呼出・依存、データとStateの所有、非同期・外部境界、Consumerごとの振る舞いを調査し、確認済み事実・推論・未確認事項を分けて後続作業へ渡す。
---

# Codebase Investigation

## 目的と適用条件

Memoriaの**既存コードが現時点で何を行い、どこに責務・依存・状態・副作用・契約が存在するか**を調べるときに使います。既存機能の説明、原因・責務の所在調査、Component/Moduleの関係整理、複数Consumerの差分、将来の設計・実装・レビューへ渡す現状把握に適用します。Frontendに限らず、API・Infrastructure等の各Repositoryで使用できます。初期の受け入れ事例はFrontendを使います。

このSkillは**取得した実装を深く読み解く調査手順**です。設計の採否、変更案の影響評価そのもの、既存コードの修正、品質Gateの合否認定、仕様変更・GitHub writeの許可を定義しません。単純なファイル検索や正本の所在確認だけで十分なら、そのために大規模な構造分析を行いません。独立Agentや固定の調査台帳も必要としません。

## 正本・隣接Skillとの境界

- [Context map](../../content/context/index.mdx)：タスク別の参照経路、情報優先順位、横断的な調査範囲。
- [AI支援開発](../../content/ai-development.mdx)・[開発プロセス](../../content/development-process.mdx)：合意、実行権限、Issue/PR、調査結果の扱い。
- 対象Repositoryの**現在の** `AGENTS.md`、設計Owner Document、実装規約、schema、config、code、Story/test、CI定義、および関連Issue/PRがそれぞれ所有する情報。Frontendなら[Frontend実装規約](../../content/system/web/implementation-conventions.mdx)・[Frontendテスト戦略](../../content/system/web/frontend-testing.mdx)・[Frontend UI設計](../../content/system/frontend-ui-development.mdx)を、必要な論点について参照します。他のRepositoryではその領域の正本に従います。

隣接する既存Skillとの分担：

- [Task Context Resolution](../task-context-resolution/SKILL.md)：Goal・Scope、対象Repo/branch、Issue/PRと操作許可の確認。
- [Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)：必要な正本・コードの所有先や参照経路の特定、本文の取得、確認済み・未取得の区別。**本Skillは取得した本文から実装の制御・依存・データ/状態の動きを分析**します。分析途中で必要になったファイルは追加readしてよく、形式的なSkill間引き継ぎは要求しません。
- [Branch Management](../branch-management/SKILL.md)：既存branchの継続・切り替えや、新規branchの判断。
- [Component Refactoring](../component-refactoring/SKILL.md)：**変更を前提とする**Frontendの責務分離・契約保全・実装と回帰確認。本Skillが調査した事実だけでは、Component境界の変更方針は確定しません。
- Impact Analysis（未導入候補）：**特定の変更案・差分から**波及先、リスク、必要な検証を導く領域。現状調査から自動的に変更影響の合格判定へ進みません。

このSkillに既存の正本規約を複製しません。調査時点の最新本文を取得します。

## 入力と着手条件

- 何を知りたいかという問い（例：State Owner、呼出経路、GraphQLの結果分類、複数Consumerの違い、実際の保存/復旧動作）。
- 対象Repository / branch（必要ならcommit）、関連Issue/PR、調査範囲・対象外、読み取り・検証・writeの許可。
- 関連する設計・Runtime・Story・Testの候補。具体的なファイルは調査中に発見してよい。

不足する情報は必要なreadで補います。存在が確認できないbranch/pathや取得できない本文を、過去のIssueや類似ファイルから推測で確定しません。調査依頼だけなら新branch・commit・PRは作りません。

## 実行手順

### 1. 現在の実装と調査の問いを確定する

1. 現在の指示、合意済みScope、許可、関連Issue/PRの**実状態**を照合し、調査の問いと「何が分かれば終了か」を明確にする。対象Repo/branch/commitを示し、過去の会話やIssueに書かれた旧パスを現在の実装と見なさない。
2. 対象branchの現在の実ファイル・export / Public API・設定をreadし、現行Entryを特定する。移設・rename・削除があれば最新のpathを見つけ直し、旧名の404を実装不存在の最終証拠としない。履歴は差分の説明に必要なときだけ参照する。
3. 問いに必要な範囲に限定して調査を開始する。全Repository走査や全資料の取得をデフォルトにしない。

### 2. 呼び出し・依存・実行経路を追う

1. Entry / Export / 直接のCaller・Consumerと、Module外への依存、Hook/Controller、UI/Domain Logic、External IO（例：Router、GraphQL・DB、Network、Cache、Storage、認証・権限、イベント）を**必要な方向に**追う。
2. import/exportの存在とRuntimeの呼び出しを分ける。Public API、type-only import、barrel export、動的な実行経路、Dependency Injection、Frameworkによる登録・Route/Handler等を取り違えない。参照の存在は実行の証明ではない。
3. 複数ConsumerのProps / Callback / Slot / Composition、異なるState Owner、Visibility、Navigation、権限・操作・State表現をそれぞれ確認する。同じ名前や見た目だけで同一責務・同一Behaviorと結論しない。
4. 必要に応じ、処理の前提・入力→変換→出力・非同期経路・Error/Retry/Cancel、状態遷移・副作用、外部境界との相互作用を追跡する。影響しない枝まで機械的に辿らない。

### 3. 実際の契約と検証可能性を整理する

1. 各判断の根拠を取得済みの**repo / branch（またはcommit）/ path / 本文**に結び付ける。仕様の意図（`intended`）、コードが示す現行実装（`actual`）、Story/Testが表明する期待、実行・CIで観測した結果は別々に記録する。
2. **コード本文から静的に言えること**（分岐・配線・値の受渡し・呼出対象）、**条件付きの推論**（Runtime環境や別Moduleに依存）、**実行して初めて言えること**（表示・操作の成立、通信、Focus/Scroll、Latency等）を区別する。テストが存在すること、Storyの`play`が書かれていることは、テストの成功を意味しない。
3. 設計と実装、実装とStory/Testの不一致や、未実装・Preview/Mock・Stub・外部API未接続を発見したら、根拠と機能上の意味を整理する。どちらが正しいか、仕様変更や実装修正をどちらに行うかを本Skillで決定しない。
4. 必須ファイルが取得できない、動的経路を追えない、branchが途中で変わった等のときは、確認済み範囲を保持して重要な未確定判断を保留する。結果不明のread/writeを勝手に成功扱いしない。既知情報を無制限に再取得しない。

### 4. 次の作業に使える調査結果を返す

必要な項目だけを会話・既存Issue/PRの許可された場所へ簡潔に引き渡します。

- **対象・根拠**：問い、Repository / ref / commit、確認したOwner Document・code・config・Story/test。
- **現行構造と経路**：Entry、Consumer、Public API、依存方向、Data/State OwnerとSide Effect / External boundary。説明に必要なら小さな呼出図を使ってよいが、形式を強制しない。
- **確認したBehaviorと限界**：具体的な分岐・状態・入力/出力を根拠で説明し、静的推論・テスト記述・実行で確認済みを区別。
- **差異・未確認事項**：intended/actualの不一致、旧Issueと現行実装のずれ、取得できないpath、実行時確認が必要な条件。
- **次に必要な調査・判断**：追加取得の範囲、変更影響分析・責務再設計・テストの引き渡し先、重要な要合意事項。

固定JSON・永続調査ドキュメント・一律必須Gateは導入しません。結果が単純なら短い説明で終了します。

## 完了・停止条件

- 問いに対する**現行の実装構造・責務・根拠**を必要な粒度で説明し、確認できなかった重要箇所とそのため言えないことを区別した。
- 対象branch/commitを取り違えず、旧Issue・名称の類似・単なるimport線・存在するだけのTestから実行Behaviorや品質保証を断定していない。
- 検証や再現が依頼され、明示的に許可されている場合だけ必要な実行を行い、実行環境・結果を区別して報告する。読み取り専用ならそれを超える操作をしない。
- 仕様変更・Component境界の大きな決定・修正・PR/mergeに進む必要があれば、調査結果と選択肢を示して既存規約と人間の合意へ引き渡す。Skill本文にGitHub操作権限はない。
- GitHubへの変更が別途許可された場合のみ実施し、結果不明のwriteは最新状態をreadしてから判断し、変更後のSource of Truthを再取得する。
