# Portfolio to-do

Two lists: what Claude is building, and what only Kevin can do. Most of
Claude's work is built so it switches on the moment Kevin fills in the
matching item. Those pairs share a letter (A, B, C…).

## Claude's list

- [x] **Pin GitHub Actions to exact commits.** The deploy workflow can't be altered by someone moving a version tag.
- [x] **Weekly broken-link check.** A workflow checks every link on the site, including your live apps, and fails if any are dead.
- [x] **On-site résumé page (A).** `/resume/` is built from `profile.ts`, so it never drifts from the site. It has a PDF download that appears once the file exists, and the Résumé buttons point here instead of Google Drive.
- [x] **Contact form ready for a real backend (B).** It sends messages directly once `contactEndpoint` is set; until then it opens the visitor's email app.
- [x] **Analytics, ready to switch on (C).** GoatCounter loads only when `analytics.goatcounter` is set, and every main button reports its clicks.
- [x] **Testimonials section (D).** It appears once at least one quote is added to `testimonials`.
- [x] **Deep dive on the Improwised error-resolving system (E).** `/work/ers/` has an 8-step architecture diagram and write-up built from the facts on your résumé. The RITAAwards work at Rovren got a case study too (`/work/rita-awards/`). Both are linked from their journey chapters. The parts Claude had to infer are marked `ASSUMED`.
- [x] **Social preview image.** A generated card for links shared on LinkedIn, X and Slack.
- [x] **Safer placeholder text.** The "Now" chapter no longer claims a job you may not have. It holds neutral wording until you replace it.
- [ ] **Notes on the site (F).** Write posts as Markdown files in the repo. Builds after your first post exists.
- [ ] **Cut or merge weaker projects (G).** Waiting for your decision.

## Kevin's list

### Do these first
- [ ] **Change the Pages source.** Settings → Pages → Source: **GitHub Actions**. Until then, two deploys race on every push.
- [ ] **Replace every `ASSUMED` line** in `src/content/profile.ts`. Start with the "Now" chapter (your current role), then project years, case studies and services.
- [ ] **Check your live apps open:** srs.kmmenpara.xyz, placebook.kmmenpara.xyz, paymentapi.kmmenpara.xyz/api/v1/. Fix them, or remove the `live` link from any that are down. The weekly link check will also report them.

### Unlocks Claude's work
- [ ] **A: Add your résumé PDF** as `public/resume.pdf`. The download button appears automatically. (Until then, visitors can use "Print or save as PDF" on the résumé page, which gives a clean 2-page copy.)
- [ ] **B: Create a form endpoint.** Sign up at formspree.io (free), create a form, and paste its URL into `contactEndpoint` in `profile.ts`.
- [ ] **C: Turn on analytics.** Sign up at goatcounter.com (free), pick a code (e.g. `kmenpara`), and set `analytics.goatcounter` to that code.
- [ ] **D: Get one or two testimonials.** Ask your Improwised and Rovren leads for two or three sentences you can quote, with their name and role. Add them to `testimonials`.
- [ ] **E: Review the error-resolving system deep dive.** Correct the diagram and fill in the `ASSUMED` parts: what triggered the system, where the answers went, and one thing that failed and what you changed.
- [ ] **F: Write your first note.** 400–800 words on something you learned building the error-resolving system or PayMe. Send Claude the text, or add it as a Markdown file.
- [ ] **G: Decide which projects to keep.** Learning Log and the version control system read as coursework. Keep, cut or merge them.

### Bigger moves
- [ ] **Custom domain.** Renew kmmenpara.xyz, add a CNAME record pointing to `kevinmenpara.github.io`, then set it under Settings → Pages → Custom domain. No code changes are needed.
- [ ] **Build one product of your own** (for VCs and startups). A small tool spun off from your error-resolving system idea would fit. Track its users and add it as a chapter.
- [ ] **Build in public.** Pin your best repos on GitHub, write good READMEs, and post progress on LinkedIn.
