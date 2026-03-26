# Cyphro

![GitHub Stable](https://img.shields.io/badge/stable-1.0.0-blue)
[![GitHub License](https://img.shields.io/github/license/luxluxlux/cyphro)](https://github.com/luxluxlux/cyphro/blob/main/LICENSE.md)

**Cyphro** is a privacy-first, free, open-source web application that helps users protect personal files from scammers and unauthorized access. Files can be secured with a password or optionally disguised as another file type — all directly in the browser, without relying on external services.

## Key Features

| Feature | Description |
| --- | --- |
| 🛡️ **Password protection** | Protect a file with a password so that only users who know it can access its contents. |
| 🌐 **No installation** | Runs entirely in the browser — no installation, plugins, or extensions required. |
| 🙈 **No registration** | Use the app without creating an account or providing personal information. |
| 💸 **Completely free** | 100% free to use — no ads, no subscriptions, no usage limits. |
| 🧩 **Open source** | Transparent and community-driven. Anyone can review, audit, or contribute to the source code. |
| 🖥️ **Local data processing** | All operations happen locally in the browser. Files never leave the user's device. |

## How It Works

The user selects a file, sets a password, and can optionally choose another file type as a disguise. The application processes the file locally and restricts access to its contents until the correct password is provided.

To restore access, the user opens the protected file in the application and enters the same password. The application does not store, inspect, or retain user files or passwords at any point.

All processing occurs exclusively on the user's device.

## Usage Policy

Before using this application, users must review the **Terms of Use** and **Privacy Policy** published on the official website. The application must be used in compliance with applicable local laws and regulations.

The developers do not provide commercial services through this instance. The source code is provided as open source and may be used, modified, or integrated by third parties in accordance with the [MIT license](https://github.com/luxluxlux/cyphro/blob/main/LICENSE.md).

## Data and Responsibility

The application does not download, store, or access user files or passwords. All file processing remains on the user's device.

Users are solely responsible for how they use the application. The service must not be used to process illegal content or materials that violate applicable laws.

## Documentation

- [Licence](https://github.com/luxluxlux/cyphro/blob/main/LICENSE.md)
- [QA checklist](https://github.com/luxluxlux/cyphro/blob/main/docs/QA_CHECKLIST.md)
- [Device coverage](https://github.com/luxluxlux/cyphro/blob/main/docs/DEVICE_COVERAGE.md)
- [Figma layouts](https://www.figma.com/proto/vJngV2H7MrnI0pt3XD4Bos/Cyphro?t=iBSnFTpCMg47VyAc-0&scaling=contain&content-scaling=fixed&page-id=0%3A1&node-id=1140-161)

## Launch

Choose one of the following methods to run the application.

### Node.js

1. Go to the client directory:

   ```
   cd client
   ```

1. Install dependencies:

   ```
   npm install
   ```

1. Start the development server:

   ```
   npm run start
   ```

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Docker

1. Run Docker Compose:

   ```
   docker compose up --build
   ```

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
