---
name: cross-repository-contract-analysis
description: Memoriaの複数Repositoryにまたがる既存のAPI・Runtime・Storage等の公開インターフェースについて、設計・提供側・利用側の現在の契約を照合し、一致・不一致・条件付き・未確認を根拠付きで区別する。
---

# Cross-Repository Contract Analysis

## 目的と適用条件

**複数Repository間で現在成立するべき契約が、設計上の期待と提供側・利用側の実装・設定で整合するか**を調べます。具体的な変更案やPR差分がなくても適用します。Web/APIのGraphQLや、APIとIaCのRuntime/Storage/Network/IAMの接続条件など、依頼に関係する境界だけを扱います。複数Repositoryの全ファイルを一律に監査しません。

出力する判断は「**契約の対象と所有先 → 提供側／利用側 → 比較した仕様と実装 → 一致・不一致・条件付き・未確認 → 必要な検証・要合意事項**」です。設計意図、静的なコードの一致、実際のデプロイ・認証・通信成立は別の証拠水準です。確認できない部分を整合済みと報告しません。

## 正本と隣接Skill

- [Context map](../../content/context/index.mdx)、[AI支援開発](../../content/ai-development.mdx)、[開発プロセス](../../content/development-process.mdx)：参照順序、設計・実装の違い、操作許可、Issue/PRへの記録。
- 各Repositoryの最新`AGENTS.md`、該当するOwner Document、実行可能なSchema・設定・実コード・生成物・Test・CI定義、必要な場合のdeployment record。GraphQLの所有関係と移行順序は[API Schema Ownership](../../content/system/api/schema-ownership.mdx)を正本とする。
- [Task Context Resolution](../task-context-resolution/SKILL.md)：Goal、対象Repo/branch・Issue/PR、権限。
- [Source of Truth Discovery](../source-of-truth-discovery/SKILL.md)：契約の所在、Owner Documentと本文の取得。ここでは取得した**複数の契約面の対応関係**を判定する。
- [Codebase Investigation](../codebase-investigation/SKILL.md)：Repository内の呼び出し・State/Side Effect・実際の利用経路を解明。契約評価に必要な場合はその場で追加readしてよい。
- [Impact Analysis](../impact-analysis/SKILL.md)：具体的な変更案・diffを起点とするConsumerへの波及・回帰リスク・検証範囲。本Skillは**変更案がなくても現在のRepository間の整合性を確認**する。変更の影響を求められたらImpact Analysisの責務へ引き渡す。
- Specification Consistency Review（未導入候補）：Spec/Issue/Code/Test全体に関する一般的な整合監査。本SkillはRepository間の**特定の公開・運用インターフェース**に範囲を限定する。実行テスト・Regression Review / Test Designも代行しない。

本Skillは規約・Product仕様・新たなQuality Gate・操作権限の正本ではありません。既存の正本をSkill本文へ複製しません。

## 入力と調査範囲

- 調査する機能・契約面・具体的な問い。API field、Operation、Endpoint、Config、Secretの名前と注入、IAM、Storage/DBなど。
- 関係RepositoryのProvider／Consumer／Design Owner、対象branch・commit・環境・Version、関連Issue/PR、検証・GitHub writeの許可（判明している範囲）。
- 比較すべき型、nullability、Enum、意味、認可、Error、Cache、pagination、設定／通信要件、Versionの共存条件。対象外も明確にする。

不明な所有先やrefは最新のGitHub readで確認します。異なるRepositoryの`develop`が同じデプロイ版とは限りません。環境や適用Versionが未取得なら実稼働の互換性を断定しません。

## 実行手順

### 1. 基準と接続面を確定する

1. 最新依頼・Issue・PR、対象Repoとbranch/commit、調査権限を確認する。古い会話・Issueのpathや過去の結果を現在のコードとして扱わない。
2. Context map・各Repoの`AGENTS.md`から、意図する仕様を所有する設計正本、提供側の実行可能な契約、利用側のOperation／Config／実際のCallerを特定し、必要な本文を取得する。表面の名前が同じだけで接続が存在すると断定しない。
3. 各Repositoryの取得時点・ref、契約の比較単位を固定し、`develop`とdeploymentを混同しない。複数環境・Versionの組合せを求められたら、その範囲を明記する。

### 2. 契約の両側を対応付ける

1. **API / Client**：SDLとOperation/Fragment、Input・Payload・nullability・Enum・Error semantics・pagination・認可とCacheの読み書きなど、依頼に必要な面を確認する。生成型や静的Validationの存在からResolverの実行・認可挙動を証明しない。
2. **Runtime / IaC**：アプリ側の環境変数・Endpoint・Secret注入・Network/Port・IAM・Storage権限・resourceの前提と、IaCの構成・構築・デプロイの経路を照合する。IAM grantとコンテナへの認証情報伝達、CloudFormation宣言とAWSの稼働状態を区別する。秘密の値を取得・出力しない。
3. **Data / Storage**：Repository間で露出するDB/Storage schema・path・権限・lifecycle・migration/rollback・互換性を関係範囲で比較する。ローカル用Composeと本番IaCを同じ実行環境とみなさない。
4. **Design / Executable Contract**：設計正本の意図と、schema/config/codeが示す現行の実装契約を別々に記録する。差異があれば一方を機械的に正として直さない。
5. **Versionと移行**：現在デプロイされる組合せ、additive changeとdeprecation、旧Consumerが残る期間を区別する。必要なVersion・migration順序が取得できない場合は互換性を保証しない。
6. 調査した範囲について**影響がない／整合している**と言える根拠と前提を残す。全Repoを読んでいなければ全体の無影響・完全互換を断定しない。

### 3. 証拠の水準と不一致を分類する

- **confirmed compatible**：取得した特定の双方のSchema/Config/コードから、定義した範囲の静的な契約が一致。Runtime保証ではない。
- **confirmed mismatch**：具体的な型、名前、意味、設定、権限などの差異を両側の本文で確認。ただし変更中の意図的な差か不具合かは別に判断する。
- **conditional**：Version、環境、実行経路、Config、権限、移行順序等の条件が満たされる場合に限り成立。
- **unknown**：片側本文、実際の利用経路、環境、テスト結果、deployment状態等が未取得・未検証。

各判定にRepository・ref・path、比較した項目、対応箇所、根拠と限界を添える。証拠のない「一致」や、単なる潜在リスクをすでに発生した不具合とする判定を避ける。TestやCIが存在することと、特定SHAで成功したことを区別する。

### 4. 判断と追加検証へ引き渡す

関係する部分だけについて、Operation validation / codegen、Contract Test、Integration/E2E、Auth、CloudFormation synth / diff、IAM/Network/Secret注入、実デプロイの確認など、**不足する証拠を得る方法**を提案する。調査だけの指示では実行しない。

契約変更や破壊的互換性変更、仕様の優先、Schema/Config/IAMの修正、migration、release順序は、選択肢・リスク・要確認事項を示し人間と合意してから進める。片側read失敗、Version不明、環境差異や現在のIssue/PRとの重要な矛盾がある場合は、当該重要結論をunknownとして保留する。結果不明のwriteがあれば再送前に最新状態をreadする。

### 5. 結果を報告する

調査の規模に応じ、次を簡潔に引き渡す。固定JSON・新たな台帳・全Repositoryの網羅表は必須としない。

- **範囲**：契約・環境・対象Repository/branch/commit、確認済みのOwner Documentと対象外。
- **対応と判定**：設計→Provider→Consumer、照合した仕様・実コード、confirmed compatible / confirmed mismatch / conditional / unknown。
- **限界と必要な確認**：静的照合か実行確認か、Version・Env・Authなどの未取得箇所、検証の必要性。
- **引渡しと要合意**：仕様変更・修正方針の候補、Impact Analysisや実装・Review等へ引き渡す事項、未許可操作。

## 完了条件・非責務

- 対象のRepository間の契約を対応付け、確認済みの範囲と結論の証拠水準、未確認・不整合・必要な検証を説明できる。
- 取得できない重要な契約やRuntime・Versionはunknownとして残し、全体一致・互換性を保証したと誤認させない。
- 実装・テスト実行・Config変更・PR/merge/Deployは、本Skillの採用やread依頼だけでは許可されない。各操作が別途許可された場合も正本に従い、変更結果をGitHub等から再取得する。
- 実変更への影響予測、一般的な仕様監査、Quality Gateの合否やテスト実行を必須の付属工程にしない。
