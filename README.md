# Kevin Menpara — Portfolio

Personal portfolio built with **Next.js** (App Router, static export), **TypeScript** and **Tailwind CSS**, deployed to **GitHub Pages**.

Live: https://kevinmenpara.github.io/portfolio/

## Updating content

All text, links, experience, projects and skills live in one file:

```
src/content/profile.ts
```

Edit it, commit, and push to `main` — the site rebuilds and deploys automatically.
Project screenshots go in `src/assets/projects/` (WebP, ~1200px wide) and are imported at the top of `profile.ts`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run typecheck
```

## Structure

```
src/
  app/          layout (metadata, theme), page (all sections), global styles, favicon
  components/   Nav, ThemeToggle, Typewriter, Reveal, Section, icons
  content/      profile.ts — the site's content
  assets/       images imported by the content file
.github/workflows/deploy.yml   build + deploy to GitHub Pages
```

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `out/` to GitHub Pages.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
The base path is detected automatically, so adding a custom domain later needs no code change.
