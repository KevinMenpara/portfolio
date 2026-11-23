# Kevin Menpara — Portfolio

Personal portfolio and landing page, told as a journey (school → DA-IICT → internships → now). Built with **Next.js** (App Router, static export), **TypeScript** and **Tailwind CSS**, deployed to **GitHub Pages**.

Live: https://kevinmenpara.github.io/portfolio/

## Updating content

All text lives in one file: the journey chapters, projects and their case studies, services, notes, skills and links.

```
src/content/profile.ts
```

Edit it, commit, and push to `main` — the site rebuilds and deploys automatically.
Placeholder text written during the redesign is marked `ASSUMED`; search for it and replace it with your own story. Notes appear on the site once `notes` has at least one entry. To make the contact form send messages directly, set `contactEndpoint` (e.g. a Formspree URL); otherwise it opens the visitor's email app.

Project screenshots go in `src/assets/projects/` (WebP, ~1200px wide) and are imported at the top of `profile.ts`.

## Switches in `profile.ts`

| Setting | What it does |
| --- | --- |
| `contactEndpoint` | Form backend URL (e.g. Formspree). Empty: the form opens the visitor's email app. |
| `analytics.goatcounter` | GoatCounter code. Empty: no analytics script loads. |
| `resumePdf` | Résumé PDF in `public/`. The download button appears once the file exists. |
| `showPhone` | Show or hide the phone number. |
| `testimonials`, `notes` | Their sections appear once they have entries. |

See `TODO.md` for what's left.

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
  app/work/     one case-study page per project
  app/resume/   résumé page, built from the same content (prints cleanly)
  app/og.png/   social preview image, generated at build time
  components/   SiteHeader, Journey, ContactForm, SiteFooter, ThemeToggle, icons
  content/      profile.ts — the site's content
  assets/       images imported by the content file
.github/workflows/deploy.yml   build + deploy to GitHub Pages
```

## Deployment

`.github/workflows/links.yml` checks every link on the site weekly.

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `out/` to GitHub Pages.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
The base path is detected automatically, so adding a custom domain later needs no code change.
