# eCommerce Application

Educational project presented as a demo version of an online shop. The task is focused on gaining knowledge of team development.

## Description

The e-Commerce application is being developed by a team of 3 developers over the course of 4 sprints using the Scrum methodology.
The application is a model of an online store that closely resembles reality.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

Project goals:

- Gain an understanding of team development and Scrum methodologies.
- Strengthen knowledge in TypeScript development and master the basics of React framework development.
- Master the basics of writing unit tests.
- Deepen experience in writing Single Page Application (SPA).

## Technology stack

- Main library: [**React**](https://react.dev/)
- Language: [**TypeScript**](https://www.typescriptlang.org/)
- Styling: [**SCSS**](https://sass-lang.com/)
- Builder: [**Vite**](https://vitejs.dev/)
- Linters: [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io/)
- Pre-push/Pre-commit: [**Husky**](https://typicode.github.io/husky/)
- UI-KIT: [**Material UI**](https://mui.com/material-ui/)
- API: [**@commercetools/sdk-client-v2, @commercetools/platform-sdk**](https://docs.commercetools.com/sdk/javascript-sdk)
- Tests: [**Jest**](https://jestjs.io/)
- Routing: [**React Router**](https://reactrouter.com/en/main) [**Routes map**]()
- Hosting: [**Netlify**](https://www.netlify.com/)
- Task Board: [**GitHub Pages**](https://github.com/users/Maksim99745/projects/2/views/1)
- Code style: [**Wiki**]()

## Setup instructions

1. Make sure you have node.js installed on your machine before proceeding with the setup or installation process.
   We recommend using version 20.9.0 or higher. To check if Node.js is installed, you can use the following command:

```
node -v
```

2. Make sure nmp is installed by running

```
npm -v
```

3. Fork this repo.

4. Clone your fork.

5. Run `npm ci` in the root directory. This command will install dependencies based on the exact versions specified in the package-lock.json. It ensures a consistent and reproducible environment by installing dependencies exactly as specified, making it ideal for use in development, testing, and deployment workflows.

You can use `npm ci` or `npm i` depending on your specific needs and requirements for dependency management.
If you want to install dependencies exactly as specified in the package-lock.json file (ensuring consistency and reproducibility), you should use `npm ci`.
If you're okay with potentially updating dependencies to their latest versions according to the specified version ranges in the package.json file, you can use `npm install` or `npm i`.

6. Run `npm start` to start the development serve. If it works, then you are ready to make changes.

7. Before making changes, make sure every thing works by starting dev server. Use `npm start` to run the development server using Vite

8. Create a new branch from `develop`

```
git checkout -b <branch-name>
```

Branch name should be in the format feat|fix|chore|refactor/RSS-ECOMM-sprintNumber_issueNumber-short-description
(e.g., feat/RSS-ECOMM-1_20-add-setup-instructions)

9. Be careful with commit messages; they should be in the format:
   `feat|fix|chore|refactor|build/RSS-ECOMM-sprintNumber_issueNumber: Description of the change`
   `(e.g., feat/RSS-ECOMM-1_02: Set up folder structure)`

## Scripts available

### Build

To build the project run

```
`npm run build`
```

It will be stored in the `dist/` directory.

### ESLint check

To check for code style and potential errors in the `src/` directory, including TypeScript and TSX files (--ext ts,tsx), run

```
npm run lint
```

It also reports any unused disable directives (--report-unused-disable-directives) and sets the maximum number of warnings to 0 (--max-warnings 0), which means ESLint will treat warnings as errors. This script helps quickly identify code style issues and potential errors in the project

### ESLint fix issues

To automatically fixe ESLint errors and code style issues in the `src/` directory run:

```
npm run lint:fix
```

### Check the production build

To check if the production build looks OK in your local environment use:

```
npm run preview
```

It will run scripts `vite build && vite preview` to create `dist` folder (if absent), build the project and boot up a local static web server that serves the files from dist at http://localhost:4173.

_It is important to note that `vite preview` is intended for previewing the build locally and not meant as a production server._

### Prettier check

To check if your files in the `src/` directory are formatted run

```
npm run prettier
```

This will output a human-friendly message and a list of unformatted files, if any.
It will run `prettier --check --ignore-unknown src/`, that is set to ignore unknown file types. Prettier will not attempt to check files with extensions that it does not recognize.

### Prettier fix issues

To fix code formatting issues in the `src/` directory using Prettier run:

```
npm run prettier:fix
```

The `--ignore-unknown` flag is also used to instruct Prettier not to format files with extensions that it does not recognize.

### ESLint and Prettier fix issues

To make ESLint fix code style issues, and then format code using Prettier in the `src/` directory - use

```
npm run format:all
```

It will run scripts `npm run lint:fix && npm run prettier:fix`

### Set up Git hooks

To automatically set up Git hooks for code linting and formatting, run the following command after installing project dependencies:

```
npm run prepare
```

### TypeScript Type Checking

To perform TypeScript type checking without generating JavaScript files, run the following command:

```
npm run types-check
```

### Total code checking by 1 command

To perform total code checking, ensuring code quality and consistency before pushing changes to the repository or before building and deploying, run the command

```
npm run validate:all
```

### Utilizing unit tests

To execute the unit tests via [Jest](https://jestjs.io) tun

```
npm run test
```

## We use commercetools

- [SDK documentation](https://docs.commercetools.com/sdk/javascript-sdk)
- [API](https://docs.commercetools.com/api)
- [Import products](https://docs.commercetools.com/merchant-center/import-products)
- [Use SDK example](https://github.com/commercetools/commercetools-ts-sdk-template)

You have to add `.env` file to the project's root with these variables:

```env
CTP_PROJECT_KEY=your-project-key
CTP_CLIENT_SECRET=your-client-secret
CTP_CLIENT_ID=your-client-id
CTP_AUTH_URL=your-auth-url
CTP_API_URL=your-api-url
CTP_SCOPES=your-scopes
```
