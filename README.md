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
