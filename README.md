# Playwright Tests App

Nx workspace with:

- Angular SSR web app (`web`)
- Gherkin-based end-to-end tests powered by Playwright (`web-e2e`)

The app shows a records table on the landing page and supports navigation to a record details route.

## Projects

- App: `apps/web`
- E2E: `apps/web-e2e`

## Tech Stack

### Application

- Angular 21
- Angular SSR (`@angular/ssr`)
- Router for SPA navigation
- HttpClient for loading test data from static JSON
- Nx (`@nx/angular`, `@nx/web`) for project orchestration

### Unit Testing

- Jest (`@nx/jest`, `jest-preset-angular`)

### E2E Testing

- Playwright (`@playwright/test`)
- Gherkin support via `playwright-bdd`
- Nx run-commands targets for test and UI mode

## Requirements

- Node.js 20+ (recommended for latest `playwright-bdd`)
- npm

## CI / GitHub Actions

This repository includes a configured GitHub Actions workflow for CI that performs:

- install dependencies with `npm ci`
- lint the web app with `npx nx lint web`
- build the web app with `npm run build:web`
- install Playwright browsers 
- execute the `web-e2e` tests

## Install

```bash
npm install
```

## How to Run the App

Start dev server:

```bash
npm run start
```

Equivalent Nx command:

```bash
npx nx serve web
```

Build app:

```bash
npm run build:web
```

Equivalent Nx command:

```bash
npx nx build web
```

## App Routing and Data

Main routes:

- `/` -> records table page
- `/records/:id` -> record details page

Static data source used by the app:

- `apps/web/public/data/records.json`

The records table and details view expose stable `data-testid` selectors used by e2e tests.

## E2E Architecture (Playwright + Gherkin)

E2E tests are written as Gherkin feature files and step definitions:

- Features: `apps/web-e2e/src/features/**/*.feature`
- Steps: `apps/web-e2e/src/steps/**/*.ts`

Playwright config:

- `apps/web-e2e/playwright.config.ts`

BDD flow:

1. `npx bddgen test --config apps/web-e2e/playwright.config.ts`
2. Generated Playwright tests are placed under `.features-gen`
3. Playwright runs the generated tests with standard Playwright runner

This gives you both:

- Gherkin authoring experience
- Playwright UI mode and tooling

## How to Run E2E Tests

Run e2e in terminal mode:

```bash
npm run test:e2e
```

This maps to Nx target:

```bash
npx nx run web-e2e:e2e
```

Open Playwright UI mode (interactive):

```bash
npm run test:e2e:ui
```

This maps to Nx target:

```bash
npx nx run web-e2e:e2e-ui
```

In UI mode, keep the Playwright window open and run only selected scenarios/tests.

## Useful Nx Commands

Show project details:

```bash
npx nx show project web
npx nx show project web-e2e
```

List workspace projects:

```bash
npx nx show projects
```

## Troubleshooting

### No tests found in Playwright

Check:

- `apps/web-e2e/playwright.config.ts` uses `defineBddConfig(...)`
- Feature path points to `src/features/**/*.feature`
- Step path points to `src/steps/**/*.ts`

### App fails to start after folder changes

Check path references in:

- `apps/web/project.json`
- `apps/web/tsconfig.json`

### E2E fails because app is not reachable

`webServer` is configured in Playwright config to start app on `http://localhost:4300`. Make sure this port is free.

## File Map

- App project config: `apps/web/project.json`
- App router: `apps/web/src/app/app.routes.ts`
- Records list page: `apps/web/src/app/pages/records-list.component.ts`
- Record details page: `apps/web/src/app/pages/record-details.component.ts`
- E2E project config: `apps/web-e2e/project.json`
- Playwright config: `apps/web-e2e/playwright.config.ts`
- Feature file example: `apps/web-e2e/src/features/records.feature`
- Step definitions example: `apps/web-e2e/src/steps/records.steps.ts`
