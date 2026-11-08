# RabbitKeeper iOS build status

## Completed
- Public distribution repository initialized.
- AltStore Classic source generator script created (not yet used for a live source).
- Manual macOS unsigned iOS test workflow: `.github/workflows/build-ios-test.yml`.
- Android APK and Vercel deployment were not changed.

## Not yet completed
- GitHub Actions macOS build has not been run successfully.
- IPA has not been signed or tested on a real iPhone.
- GitHub Releases, AltStore live source and GitHub Pages are not enabled.

## Source version warning
As inspected on 2026-11-08, the connected source repository `lumicho111/raccoonphonetest` has `mobile/version.json` versionName `1.0.7`, versionCode `9`. This has not been confirmed to contain the latest Android 026 changes. Do not publicly release an IPA until the canonical source version is verified.

## Run the test build
Go to **Actions → Build unsigned iOS test IPA → Run workflow**. The default source ref is `main`. This only uploads a short-lived Actions artifact, not a public Release.

## Before switching the source repository to Private
The current test workflow checks out the source as a public repository. Once the source becomes private, configure a read-only GitHub App or deployment key; never paste personal access tokens into public repository files.

## Packaging note
The test workflow produces a best-effort unsigned IPA from an unsigned Xcode device app. Successful compilation is not proof that AltStore/SideStore can sign and install it. Real-device testing is required.
