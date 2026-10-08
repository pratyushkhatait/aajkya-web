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

Changes are local until committed and pushed. The workflow is prepared; it does not publish anything merely by running a local build.
