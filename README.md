# GetOutFE

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# GetOut 🏕️ – Frontend

**GetOut** is a web-based application that helps you organize your gear, plan outdoor adventures, and stay prepared – whether you're hiking remote trails or paddling wild rivers.

This is the frontend project built with **Angular** and **Bootstrap**.

---

## 🚀 Features

- ✅ Responsive Angular frontend with Bootstrap 5
- ✅ Integrated Spring Boot backend (separate repo)
- ✅ PostgreSQL persistence
- ✅ Packing tips for hiking & paddling
- ✅ Standalone Angular components with modals for:
  - GDPR-compliant Privacy Policy
  - Terms of Use

---

## 🛠 Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | Angular 15+ (Standalone APIs) |
| Styling   | Bootstrap 5                 |
| Backend   | Spring Boot (Java 17+)      |
| Database  | PostgreSQL 15+              |
| License   | GPLv3                       |

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- Angular CLI 15+
- Java 17+ (for backend)
- PostgreSQL 15+

### Frontend Setup

```bash
git clone https://github.com/oxiego/getout2fe.git
cd getout2fe
npm install
ng serve
