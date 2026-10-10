# AajKya landing page

React + TypeScript + Vite. A static marketing site with build-time prerendering, an embedded 40-second walkthrough, chapter navigation, app screenshots, FAQs, and Google Play links / QR code.

## Local development

Use Node 24 (minimum 22.12), then:

```sh
npm ci
npm run dev
```

The marketing site does not need the Android app or meal-planner backend running.

```sh
npm run build
npm run preview
```

The build type-checks, emits static files, and prerenders the homepage so its content is available before JavaScript loads. Ship only `dist/`; `.prerender/` is a temporary build input.

## Content and assets

- Page content and interactions: `src/App.tsx`.
- Responsive styles and local fonts: `src/styles.css` and `public/fonts/`.
- Supplied app screenshots and food imagery: `public/media/`.
- Existing illustrated video: `public/media/aajkya-demo.mp4`, with visible captions, WebVTT, and a text transcript. Its illustrated nature is stated next to the player; it is not a recording of the current app UI.
- App screenshots are existing project / Play Store assets, not fresh emulator captures.
- Google Play destination is centralized in `PLAY_STORE` in `src/App.tsx`. If it changes, also update `scripts/generate-qr.mjs` and run `node scripts/generate-qr.mjs`.
- Existing privacy, terms, and deletion pages retain their paths and policy text.

No analytics, tracking cookies, user accounts, invented testimonials, or backend requests are added.

## GitHub Pages

The existing repository is `pratyushkhatait/aajkya-web`. The workflow builds and deploys `dist/` on pushes to `main`, or manual dispatch. Set **Settings → Pages → Build and deployment → Source → GitHub Actions** once before using it. Relative asset paths work at `/aajkya-web/` and at a custom-domain root. Existing `privacy.html`, `terms.html`, and `delete-account.html` destinations are included in the build.

Pull requests run the production build and browser smoke tests. Only main-branch pushes or manual runs on main deploy. To enforce passing checks before merging, make **Build and browser tests** a required check in a repository ruleset.

## Browser checks

After `npm ci`, run `npm run test:install` once, then `npm test`.
On Linux, install browser system dependencies with `npx playwright install --with-deps chromium`.
The checker uses Playwright’s pinned Chromium runtime and an ephemeral local port. `CHROME_PATH` is an optional override.
Tests cover the production subpath, video playback, responsive layouts, mobile navigation, FAQ/transcript, images, legal routes, and prerendering without JavaScript. Screenshots are saved in `test-results/` and uploaded by CI.

## Font licenses and asset optimization

Inter and Manrope are distributed under SIL OFL 1.1; their copyright and full license notices ship in `public/fonts/Inter-OFL.txt` and `public/fonts/Manrope-OFL.txt`.
WOFF2 files preserve the full character sets of the original TTFs. The display logo is resized to 128 × 128 pixels for high-density screens.

The homepage footer links to `support.html`, where users can contact support or reach the unchanged `delete-account.html` URL. Account deletion remains available by email without reinstalling the app.

The mobile hero prioritizes the food/app preview and compact actions within the first screen. The illustrated demo includes synthetic Indian-English narration (Microsoft Neerja Neural); its timed script is in `public/media/voiceover.txt`, with matching WebVTT captions and an on-page transcript. Playback remains user initiated.

The cook-sharing chapter includes a real Hindi note excerpt supplied by the app owner. The full sample (`public/media/cook-note.m4a`) has stripped source metadata and an English transcript in the cook section; rice quantity is 2½ katoris, confirmed by the owner. Sample and demo playback pause one another. The headline includes an English translation.
