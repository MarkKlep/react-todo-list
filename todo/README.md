# Todo List App

A Todo List app built with Next.js, React, Redux Toolkit, and Tailwind CSS.

## Features

- Add todos from the main page form
- Toggle todo completion status
- Delete todos from the list or details page
- Search todos with a debounced input
- Filter todos by status (`all`, `done`, `not-done`)
- Open a dedicated todo details page to edit title and status
- Virtualized todo list rendering for smooth scrolling with large datasets
- Light/dark theme toggle with persisted preference

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/) for end-to-end tests

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint checks
- `npm run format` - Format project files with Prettier
- `npm run format:check` - Check formatting without writing changes

## Testing

Run linting:

```bash
npm run lint
```

Run Playwright tests:

```bash
npx playwright test
```
