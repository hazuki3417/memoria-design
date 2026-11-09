# Memoria Skills

MemoriaのAI支援開発で再利用する作業手順の入口です。各Skillは実行すべき作業に適用する手順であり、開発規約・製品仕様・操作権限の新たな正本ではありません。

## Skill一覧

| Skill | 使用する状況 | 正本 |
| --- | --- | --- |
| [Codebase Investigation](./codebase-investigation/SKILL.md) | 各Repositoryの最新実装にある責務・依存・状態・副作用・Consumer・Story/Testを根拠に調査し、現行構造と未確認を説明するとき | [Context map](../content/context/index.mdx)、[AI支援開発](../content/ai-development.mdx)、各Repositoryの`AGENTS.md`・実装規約 |
| [Impact Analysis](./impact-analysis/SKILL.md) | 具体的な変更案・PR差分から直接/間接Consumer、既存Contract、回帰リスク、必要な検証と要合意事項を根拠付きで評価するとき | [Context map](../content/context/index.mdx)、[AI支援開発](../content/ai-development.mdx)、対象Repositoryの`AGENTS.md`・Owner Document・実コード |
| [Cross-Repository Contract Analysis](./cross-repository-contract-analysis/SKILL.md) | 変更案がなくても、複数Repository間の既存API・Runtime・Storage等の提供側／利用側の契約整合性と未確認事項を根拠付きで評価するとき | [Context map](../content/context/index.mdx)、[API Schema Ownership](../content/system/api/schema-ownership.mdx)、各Repositoryの`AGENTS.md`・Owner Document・実装契約 |
| [Component Refactoring](./component-refactoring/SKILL.md) | Frontend既存Component・Hook・Compositionの責務分離・共通化・移設を、既存ConsumerのVisual / Behavioral / State / Responsive Contractを維持しながら行うとき | [Frontend UI設計・開発方針](../content/system/frontend-ui-development.mdx)、[Frontend実装規約](../content/system/web/implementation-conventions.mdx)、[Frontendテスト戦略](../content/system/web/frontend-testing.mdx) |
| [Branch Management](./branch-management/SKILL.md) | GitHubのブランチを選択・作成・継続・切り替えるとき | [ブランチ運用規約](../content/branch-strategy.mdx)、[AI支援開発](../content/ai-development.mdx) |
| [Task Context Resolution](./task-context-resolution/SKILL.md) | 作業の開始・再開・依頼変更時にGoal・Scope・Issue / PR / branch・操作権限と未確認事項を整理するとき | [Context map](../content/context/index.mdx)、[AI支援開発](../content/ai-development.mdx) |
| [Source of Truth Discovery](./source-of-truth-discovery/SKILL.md) | 設計・調査・実装・レビューに必要な正本を発見・取得し、実装契約との照合範囲や未確認事項を整理するとき | [Context map](../content/context/index.mdx)、[ドキュメント管理方針](../content/documentation-policy.mdx) |

## ChatGPTからの利用

GitHub上の任意の`SKILL.md`がChatGPTに自動登録されることは前提にしません。作業内容に該当するSkillがあれば、GitHub連携で**現在の対象ブランチの最新ファイルを読み込んで**適用してください。利用可能なSkillと参照先はこの一覧から確認します。

実行前に、[Context map](../content/context/index.mdx)のタスク別の読み取り順序と操作の事前確認を適用します。Skillが参照先の規約・最新Issue・PR・人間の指示と食い違う場合は、推測で規約を上書きせず矛盾を報告します。

Skillの導入は、既存の対話型作業を機械的な定義済みプロセスに変えるものではありません。Agentごとの役割定義や独立実行環境も必要としません。
