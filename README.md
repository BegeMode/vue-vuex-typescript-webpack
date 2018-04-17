# Vue JS + Vuex + TypeScript + webpack 4

> A Vue 2.5, Vuex 3.0, Webpack 4.2, Typescript 2.8, Bootstrap 4.1 setup with hot reload, dynamic imports, unit testing,
code coverage, sass and bundling/minification.

Inspired by <https://github.com/ducksoupdev/vue-webpack-typescript>.

Added Vuex store, vue-meta (<https://github.com/declandewet/vue-meta)> - useful tool
for add meta info to your pages (title, meta tags etc.)

> See the [changelog](CHANGELOG.md) for updates.

### Usage

This is a project template for [vue-cli < 3.x](https://github.com/vuejs/vue-cli).

``` bash
$ npm install -g vue-cli
$ vue init begemode/vue-vuex-typescript-webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```
By default, <http://localhost:3000/>

### What's Included

- `npm run dev`: Webpack + Typescript with config for source maps & hot-reload
- `npm test`: Mocha unit tests
- `npm run test:debug`: Debug Mocha unit tests in Chrome
- `npm run test:watch`: Fast feedback Mocha unit tests with hot-reload
- `npm run coverage`: Karma coverage reporter
- `npm run lint`: Lint all Typescript files
- `npm run build`: build with HTML/CSS/JS minification, code splitting and icon generation
- `npm run ci:teamcity`: Teamcity CI integration
- `npm run ci:jenkins`: Jenkins CI integration
