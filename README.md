# Pip-Boy Portfolio

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License: Private](https://img.shields.io/badge/license-private-lightgrey)](https://github.com/GerryHorror/pipboy-portfolio)

My CV, reskinned as a Fallout Pip-Boy. Boot screen, CRT scanlines, a HUD clock, swipeable tabs: built in React and TypeScript because a static page felt like a waste of a perfectly good theme.

Live content: skills, projects, experience, education, contact details. All real, none of it lore.

## Tabs

- **Profile**: who I am, headline stack, key metrics
- **Stats**: skills by category, with levels
- **Quests**: projects and work experience, logged as quests because why not
- **Contact**: email, phone, GitHub, LinkedIn, CV download (previewed in-screen, not a tab dump)

Three colour themes: amber, green, pride.

## Stack

React 19, TypeScript, Vite 7, lucide-react for icons. Deployed on Vercel.

## Running it

```bash
npm install
npm run dev
```

- `npm run build`: type-check, then build
- `npm run preview`: preview the production build
- `npm run lint`: ESLint

## Structure

```
src/
  components/          # shell, nav, theme controls, boot screen
  components/panels/   # one panel per tab
  data/                 # portfolio content + tab config
  types.ts
```

All the actual content (profile, skills, experience, projects) lives in [src/data/portfolio.ts](src/data/portfolio.ts). That's the file to edit, not the components.
