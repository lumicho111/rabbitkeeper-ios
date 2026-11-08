# RabbitKeeper iOS Status (Resource 027)

## Verified
- `raccoonphonetest` contains the Resource 027 business-code commit.
- Android release repository `rabbitkeeper-updatededicated` latest published resource commit is 027.
- Earlier unsigned iOS test build `42457969842` completed successfully.
- Its IPA was successfully installed using Sideloadly on a tester's iPhone.
- The duplicate framework Bundle ID problem was fixed and build-side checks passed.

## Prepared
- Private source workflow `.github/workflows/ios-publish-sidestore.yml` packages iOS app, publishes an IPA to public GitHub Releases, and updates the SideStore-compatible AltSource.
- A neutral RabbitKeeper icon replaces public-facing Float artwork in this iOS release process.
- Public `scripts/update-altstore-source.mjs` maintains the update source versions with monotonically increasing build numbers.
- [SideStore install instructions](SIDESTORE.md) document in-phone updates and data safety.

## Blockers before the first public release
1. User must add private source repository secret `RABBITKEEPER_IOS_PUBLISH_TOKEN`, a fine-grained GitHub token with Contents Read and Write for public repository `lumicho111/rabbitkeeper-ios` only.
2. User must manually run the `Publish RabbitKeeper IPA to SideStore` GitHub workflow.
3. Verify source and release are accessible, then SideStore install and overlay update on the phone.

## Initial version
- Resource: 027.
- App: `app.ii.phone`, version `1.0.7`, build `9`.
- Next update MUST use a higher iOS build, e.g. 10.
- Until the first successful release, `source.json` does not exist and the URL is not an active app source.

Android APK and Vercel were not changed for this iOS workflow.
