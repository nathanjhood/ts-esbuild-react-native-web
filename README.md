# ts-esbuild-react-native-web

A template project for modern web front-end applications using React Native Web.

[![Node](https://github.com/nathanjhood/ts-esbuild-react/actions/workflows/node.yml/badge.svg)](https://github.com/nathanjhood/ts-esbuild-react/actions/workflows/node.yml)

[![Build and Deploy static content to Pages](https://github.com/nathanjhood/ts-esbuild-react/actions/workflows/static.yml/badge.svg)](https://github.com/nathanjhood/ts-esbuild-react/actions/workflows/static.yml)

## Contents

- [Quickstart](#quickstart)
  - [Develop](#develop)
  - [Test](#test)
  - [Deploy](#deploy)
- [About](#about)
  - [Commands](#commands)
  - [Motivations](#motivations)
- [Further Reading](#further-reading)

---

## Quickstart

### Develop

Install required dependencies (React, esbuild, typescript, etc...)

```sh
yarn
```

Start esbuild's local development server with hot-reloading and typescript support:

```sh
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Edit `src/App.tsx` - the page in the browser will refresh when you save any changes to your source files in your IDE.

---

### Test

```sh
yarn test
```

---

### Deploy

To create a built application for deployment:

```sh
yarn build
```

Optionally, preview the built application before deploying:

```sh
yarn serve -s build
```


## About

Use React Native components in your web application.

A [React-Native-Web](https://necolas.github.io/react-native-web/) - *for* web - starter project template, powered by [esbuild-scripts](https://github.com/nathanjhood/esbuild-scripts) with Typescript support and a hot-reloading dev server.

This template repository is a port of the official React `create-react-app --template typescript` boilerplate code; the `App.tsx` and `index.tsx` templates replaced with equivalent React-Native-Web ones, all powered by [esbuild](https://esbuild.github.io/) with Typescript.

This template ships with `@nathanjhood/esbuild-scripts`; In which, the usual `react-scripts`'s Webpack-powered implementation has been replaced with a similar set of functionality using esbuild.*

---

### Commands

```json
"scripts": {
  "start": "esbuild-scripts start",
  "build": "esbuild-scripts build",
  "test": "echo \"tests not implmented yet\"",
  "type-check": "tsc --noEmit",
  "gen:css": "tailwindcss --config tailwind.config.js --postcss postcss.config.js --output src/styles.css",
  "gen:certs": "openssl req -x509 -newkey rsa:4096 -keyout app.key -out app.cert -days 9999 -nodes -subj /CN=127.0.0.1",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --check ./**/*.{js,jsx,ts,tsx,css,md,json} --config ./prettier.config.mjs",
  "format:fix": "prettier --write ./**/*.{js,jsx,ts,tsx,css,md,json} --config ./prettier.config.mjs"
}
```

---
## Further Reading

- [https://necolas.github.io/react-native-web/](https://necolas.github.io/react-native-web/)
- [https://blog.logrocket.com/complete-guide-react-native-web/](https://blog.logrocket.com/complete-guide-react-native-web/)
- [https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage](https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage)
- [https://eisenbergeffect.medium.com/an-esbuild-setup-for-typescript-3b24852479fe](https://eisenbergeffect.medium.com/an-esbuild-setup-for-typescript-3b24852479fe)
- [https://gist.github.com/Med-H/5f2e2084309cb75134aa0a106c78e214](https://gist.github.com/Med-H/5f2e2084309cb75134aa0a106c78e214)
