# Web-component brewery app

A POC Web-components application for tracking breweries you've visited. It uses [Open Brewery DB](https://www.openbrewerydb.org/) for data so unfortunately only covers US cities.

_Completed as part of [Dave Rupert](https://daverupert.com/)'s [Web Components course](https://frontendmasters.com/courses/web-components)_

![image](https://github.com/johnhunter/wc-brewery-app/assets/219160/4d0d73ce-29ce-46e9-b626-eed2bee47376)

## The stack

A TypeScript project that uses [Lit](https://lit.dev/) to build a web-component based app. Production build is provided by [Rollup](https://rollupjs.org/) and [Esbuild](https://esbuild.github.io/). The project was scaffolded using the [@open-wc](https://github.com/open-wc) starter.

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```sh
npm install
npm start
```

Will open your browser at http://localhost:8000

### Changing the city

The brewery-app component takes an optional attribute `city`. To change the city:

1. Open the Elements panel in the browser dev-tools
2. Select the `<brewery-app>` custom element
3. Add a `city` attribute, e.g. `city="New York"`
4. The app ui will update and fetch breweries in New York 🎉

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory, generates a cem (Custom Elements Manifest)
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
