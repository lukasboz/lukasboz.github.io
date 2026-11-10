# Lukas Bozinov — portfolio

A complete, static portfolio inspired by the [Me Online Framer template](https://meonline.framer.website/). It uses a landscape home screen, browser-style navigation, editable inline search, a tabbed About profile card, and project pages styled like search results.

The site includes home, work, about, contact, resume, gallery, seven project detail pages, and a custom 404. All original project URLs are preserved. There are no packages to install, backend services, API keys, or Framer runtime dependencies. The landscape from the supplied reference is stored locally; project interface concepts are drawn with HTML/CSS/SVG and labeled as concepts.

## Develop locally

Use Node.js 20 or newer:

```sh
npm run build
npm run check
npm run preview
```

Open **http://127.0.0.1:4173**. On Windows PowerShell installations that block `npm.ps1`, use `npm.cmd` in place of `npm`.

The build writes complete static pages into both the repository root and `dist/`. The root files support the repository’s existing branch-based GitHub Pages setup; `dist/` is the standalone deployment artifact. The preview serves `dist/`. Rebuild after editing content or source files.

## Deploy to GitHub Pages

1. Push these changes to `main` or `master` on `lukasboz/lukasboz.github.io`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. The included workflow builds, checks, and deploys `dist/` to **https://lukasboz.github.io/**. It can also be run manually from the Actions tab.

If you prefer the existing **Deploy from a branch** setup, select your branch and `/ (root)`. All rendered pages and local assets are already included in the root; `.nojekyll` prevents Jekyll processing. The Actions workflow expects the GitHub Actions Pages source when used.

For another static host, run `npm run build` and upload the contents of `dist/`. Update canonical URLs, the sitemap, and robots URL in `scripts/build.mjs` if changing the production domain.

## Edit content

- `scripts/content.mjs`: personal details, projects, experience, technology lists, and search content.
- `scripts/resume.mjs`: resume details transcribed from the supplied PDF.
- `scripts/build.mjs`: page templates and shared navigation, footer, and interface concepts.
- `styles.css`: layout, responsive rules, project visuals, and resume print styles.
- `main.js`: search, keyboard shortcuts, project filters, quick links, clipboard, and email draft behavior.
- `theme.js`: early theme initialization, system preference, and persistent light/dark selection.
- `assets/landscape.png`: the locally stored reference landscape.

Run `npm run build` after editing. Commit the generated HTML and search index together with their sources.

Type directly into the search field. **Ctrl/⌘ K** or **/** focuses it. Suggestions appear beneath the field as you type; arrow keys and Enter open a suggestion, and Enter without a selection opens the Work page with the query. Search on Work filters the project list directly and combines with category filters. Escape hides suggestions without opening a modal.

About links open the profile card over the current page, following the supplied `.source/image.png` reference. Skills, Experience, and Fun facts are keyboard-accessible tabs. `about.html` also works as a standalone page. TETR.IO RL is listed from [its repository](https://github.com/lukasboz/TETR.IO-RL), with a dedicated project page and search entry.

The contact form opens a prefilled draft in the visitor’s email app; it does not submit to a server. Direct email, LinkedIn, and GitHub links are also available. The resume page follows the supplied `.source/lukas-resume.pdf`, includes **Download PDF** for the original document, and retains **Print / save PDF** for the web version. The distributable PDF is stored in `assets/lukas-resume.pdf`; builds do not require `.source/`.

Dark mode initially follows the visitor’s system preference. The sun/moon button in the header or About card saves an explicit choice across pages and reloads, and syncs it across tabs. Light mode uses the original landscape; dark mode uses `assets/Golden Sunset Over Rolling Hills.png`. Print styles remain light in both themes.
