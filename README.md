# test-claude-review

Repo central pour le workflow de **PR Review par Claude Code AI** — réutilisable par tous les repos Arianee.

**Ticket**: [ARI-2951](https://linear.app/arianee/issue/ARI-2951)

## Architecture

```
Arianee/test-claude-review (ce repo)
└── .github/workflows/claude-code-review.yml   ← Workflow réutilisable (source of truth)
└── .github/workflows/pr-review.yml            ← Caller local (pour tester ici)

Arianee/ArianeeBrandDataHub (ou tout autre repo)
└── .github/workflows/pr-review.yml            ← Caller qui appelle le workflow central
```

## Déployer sur un nouveau repo

1. **S'assurer que le secret `CLAUDE_CODE_OAUTH_TOKEN` est disponible** (repo-level ou org-level)

2. **Créer le fichier** `.github/workflows/pr-review.yml` dans le repo cible :

```yaml
name: PR Review

on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]

jobs:
  review:
    uses: Arianee/test-claude-review/.github/workflows/claude-code-review.yml@main
    secrets:
      CLAUDE_CODE_OAUTH_TOKEN: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
```

C'est tout ! 🎉

## Personnalisation

Pour filtrer par chemins (ex: review uniquement si `src/` change) :

```yaml
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
    paths:
      - "src/**"
      - "lib/**"
```

## Secret requis

| Secret | Description |
|--------|-------------|
| `CLAUDE_CODE_OAUTH_TOKEN` | Token OAuth Claude Code (généré via `claude setup-token`) |

## Notes

- Les PRs en **draft** sont ignorées
- Le workflow utilise `track_progress: true` pour un suivi visuel dans la PR
- L'action officielle `anthropics/claude-code-action@v1` gère tout le contexte GitHub automatiquement
