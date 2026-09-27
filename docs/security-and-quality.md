# Security and quality設定

この文書は、リポジトリへSecurity PolicyとCodeQL workflowをマージした後に、GitHubの管理画面で行う設定と確認手順をまとめたものです。設定画面の名称はGitHub側の更新で変わる場合があります。

## 1. セキュリティ機能

リポジトリの **Settings** → **Advanced Security** で、利用可能な次の項目を有効にします。

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Secret scanning
- Push protection
- Private vulnerability reporting

Dependabot version updatesは `.github/dependabot.yml` で管理します。npmとGitHub Actionsを定期的に確認します。

Code scanningは `.github/workflows/codeql.yml` のマージ後にAdvanced setupとして動作します。GitHub画面からDefault setupを重ねて有効にしません。

## 2. 初回実行の確認

ファイルを `develop` へマージした後、次を確認します。

1. **Actions** → **CodeQL** を開く。
2. `develop` の **Analyze JavaScript/TypeScript** が成功していることを確認する。
3. **Security** → **Code scanning** に設定エラーがないことを確認する。
4. Dependabotが `.github/dependabot.yml` を正常な設定として認識していることを確認する。
5. **Security** → **Advisories** からPrivate vulnerability reportingが利用できることを確認する。

CodeQLはJavaScript / TypeScriptの静的解析を担当します。既存の `quality / design` は依存関係のインストールとドキュメントビルドを検証するため、目的が異なり、両方を維持します。

## 3. ブランチRuleset

CodeQLの初回成功後、ブランチRulesetでCodeQLを必須チェックに含める場合は、実際に成功して選択肢へ現れたチェック名を指定します。

対象候補:

- `develop`
- `main`

必須チェック候補:

- **design**
- **Analyze JavaScript/TypeScript**

既存Rulesetがある場合は、その内容を確認してから変更します。Required approvalsなどのレビュー方針は、このSecurity整備だけを理由に変更しません。

## 4. 今回変更しない設定

- デフォルトブランチ
- merge方式
- Required approvals
- Release / deploy運用
- 既存Quality Gateのtrigger構成

これらはSecurity Policy / CodeQL導入とは分離して扱います。
