# AGENTS.md

## 責務

このrepositoryはMemoriaのプロダクト設計と横断判断の正本です。実行可能なschema、設定、commandは`memoria-web`、`memoria-api`、`memoria-IaC`を正本とします。現行、将来、提案、履歴を区別し、矛盾を推測で解消しません。

## 開発

人間が主体・最終判断者で、AIは支援です。標準環境はWindows＋WSL2 Ubuntu＋VS Code＋Devboxです。Ubuntu側でrepositoryを開き、project commandはDevbox内で実行します。

`main`は本番、`develop`は開発統合先です。作業branchは`develop`から派生し、追従はrebase、PR統合は通常のmerge commitを使います。手動commitはtype付き日本語title、ReleaseはrepositoryごとにSemantic Versioningを用います。

## 文書

サイドメニューはプロダクト→システム設計→開発・運用→記録の順です。システム設計は`pages/system/`に、全体→Web→API→データ・ストレージ→インフラ→横断設計の順で配置します。Mediaは`pages/media/`、用語は`pages/ubiquitous.mdx`、Contextは`pages/context/`を正本とします。追加・移動時は`_meta.json`、link、READMEを同じPRで更新します。

一般論だけのTips、現行・将来の根拠がないsample、旧マイクロサービス前提を設計として追加しません。MDX＋Mermaidを正本にし、理由・制約・非採用理由を残します。
