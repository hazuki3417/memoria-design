# AGENTS.md

## Repository role

This repository is the product-design and architecture source of truth for Memoria. Memoria is implemented across:

- `memoria-web`: Next.js web application
- `memoria-api`: Go GraphQL API
- `memoria-design`: this Nextra documentation site
- `memoria-IaC`: AWS CDK infrastructure

Documentation must distinguish intended design from currently implemented behavior. Do not present a proposal, TODO, or historical design as deployed fact.

## Documentation structure

- Keep product-wide vocabulary in `pages/ubiquitous.mdx`.
- Keep technology inventory in `pages/technology-stack.mdx`.
- Keep service responsibilities and contracts under `pages/micro-service/`.
- Keep schema conventions under `pages/schema/`.
- Keep AI-assisted development practices in `pages/ai-development.mdx`.
- Add meaningful pages to `pages/_meta.json`.

Prefer concise prose, explicit ownership, links to the owning repository, and Mermaid for relationships where it improves understanding. Preserve valid MDX syntax.

## Local environment and validation

```sh
devbox shell
npm ci
npm run build
```

The repository contains both `bun.lockb` and `package-lock.json`. Use `npm ci` as the documented baseline until the project explicitly standardizes one package manager. Do not regenerate or remove lockfiles incidentally.

## Working agreement

1. Verify implementation claims against the relevant Memoria repository before changing normative documentation.
2. Label future designs and unresolved decisions clearly.
3. When an architecture decision changes, record its context, decision, consequences, affected repositories, and migration path.
4. Do not copy secrets, production identifiers, account numbers, or private operational data into documentation.
5. Keep cross-repository changes in separate PRs and link them from the product-level change.

## Code Review Rules

- Flag documentation that conflicts with the current GraphQL schema, persistence model, or infrastructure without labeling the difference.
- Flag changes that blur ownership between web, API, design, and infrastructure repositories.
- Flag new product terms that bypass the ubiquitous-language glossary.
- Flag deployment or security guidance that includes secrets, broad permissions, or irreversible steps without safeguards.
- Flag architecture decisions that omit affected repositories or compatibility/migration consequences.
- Leave formatting and build validity to deterministic tooling.
