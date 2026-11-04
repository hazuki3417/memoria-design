# Memoria Skills

MemoriaのAI支援開発で再利用する作業手順の入口です。各Skillは実行すべき作業に適用する手順であり、開発規約・製品仕様・操作権限の新たな正本ではありません。

## Skill一覧

| Skill | 使用する状況 | 正本 |
| --- | --- | --- |
| [Branch Management](./branch-management/SKILL.md) | GitHubのブランチを選択・作成・継続・切り替えるとき | [ブランチ運用規約](../content/branch-strategy.mdx)、[AI支援開発](../content/ai-development.mdx) |
| [Task Context Resolution](./task-context-resolution/SKILL.md) | 作業の開始・再開・依頼変更時にGoal・Scope・Issue / PR / branch・操作権限と未確認事項を整理するとき | [Context map](../content/context/index.mdx)、[AI支援開発](../content/ai-development.mdx) |

## ChatGPTからの利用

GitHub上の任意の`SKILL.md`がChatGPTに自動登録されることは前提にしません。作業内容に該当するSkillがあれば、GitHub連携で**現在の対象ブランチの最新ファイルを読み込んで**適用してください。利用可能なSkillと参照先はこの一覧から確認します。

実行前に、[Context map](../content/context/index.mdx)のタスク別の読み取り順序と操作の事前確認を適用します。Skillが参照先の規約・最新Issue・PR・人間の指示と食い違う場合は、推測で規約を上書きせず矛盾を報告します。

Skillの導入は、既存の対話型作業を機械的な定義済みプロセスに変えるものではありません。Agentごとの役割定義や独立実行環境も必要としません。
