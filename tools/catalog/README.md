# Public Android catalogue

The app inventory is discovered from the public Google Play developer pages configured in `catalog/sources.json`; it is not maintained as a fixed package list in the Android APK. The generated `catalog/apps-v1.json` merges all sources and contains official titles for the app's twelve UI languages. The game omits its own package.

The daily GitHub Actions job uses a standard `ubuntu-latest` runner in this **public** repository. It is explicitly skipped if the repository becomes private. No paid/larger runner, Firebase job, Cloud server, new API key, Actions artifact or Actions cache is used. GitHub Pages serves the small JSON file on the existing domain. Changes to this pricing/configuration require a fresh review before enabling paid features.

Run `npm ci --ignore-scripts --no-audit --no-fund` in this folder, then `node tools/catalog/sync.mjs` from the repository root. The profile scraper is pinned by package-lock.json. The public Google Play format is not a guaranteed catalogue API; unexpected fetch/parser failures fail the job rather than silently publishing a fabricated empty catalogue.

A profile returning404 is represented as `not_found` with no entries. This is expected for the three supplied accounts that currently have no public profile. It is not proof that their future public URL will work: the next successful scan will include them once Google serves that profile. Source IDs can be corrected remotely without a new Android release.

The snapshot is refreshed once daily and when the source configuration changes. A daily verification date avoids serving a silently abandoned snapshot. The Android client rejects snapshots older than72hours and offers retry if loading fails. Google Play can cache its own data; updates are not instantaneous. The reference store country is Spain; Google Play determines installation availability for each individual user. No installation eligibility or current price is guessed by the catalogue UI.

The legacy branch-based Pages build is explicitly requested after an Actions-authored content commit. No source control history is rewritten, no app version is uploaded and no other app's pages are replaced.
