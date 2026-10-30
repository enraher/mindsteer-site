# MindSteer Site

Static landing + legal pages for Facebook Login and App Store requirements.

## Authorized app advertising sellers

The shared seller declaration is published at https://mindsteer.app/app-ads.txt
from the repository root. It preserves the existing AdMob, Unity, Tappx and
reseller declarations previously hosted at uc294d7b9.app-ads-txt.com.

Apps must link to a developer website on `mindsteer.app` in their store listing:
the contact website in Google Play and the Marketing URL in App Store Connect.
Existing app-specific paths on this domain can be retained. AdMob discovers the
file at the domain root; the website field does not need to link to the text file.

Keep `app-ads.txt` as plain text and preserve the Google publisher declaration
when updating other sellers. GitHub Pages publishes the root of `main` using
the custom domain in `CNAME`. After publishing, check the public file and request
an update in AdMob. Store URL changes and crawler verification are separate
steps; a saved draft in App Store Connect does not update the public listing.


## Unified Android catalogue

`catalog/apps-v1.json` is generated from the four public developer-profile IDs in `catalog/sources.json`, using `tools/catalog/sync.mjs`. It is refreshed once daily by `.github/workflows/sync-android-catalog.yml`, only while this repository is public and only on a standard free runner. No Firebase billing or permanent backend is used. See `tools/catalog/README.md` for source, freshness, deployment and failure handling.
