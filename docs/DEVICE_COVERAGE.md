# Device Coverage

This document defines the supported devices and browsers used for testing the **Cyphro**.

Device coverage is defined using priority levels:

- **P0** devices must be tested before every release
- **P1** devices are tested for major releases or significant changes
- **P2** devices are tested periodically or on related changes

Execution rules:

- All **(D)** checklist items must pass on all **P0** devices
- All **(R)** checklist items must pass on at least one **P0** device
- **(C)** items are tested only when related functionality changes

## 1. Desktop Platforms

### Windows

| OS         | Browser | Version | Priority | Notes   |
| ---------- | ------- | ------- | -------- | ------- |
| Windows 11 | Chrome  | Latest  | P0       |         |
| Windows 11 | Firefox | Latest  | P1       |         |
| Windows 11 | Edge    | Latest  | P1       | Primary |

### Linux

| OS         | Browser  | Version | Priority | Notes   |
| ---------- | -------- | ------- | -------- | ------- |
| Ubuntu LTS | Chrome   | Latest  | P1       |         |
| Ubuntu LTS | Firefox  | Latest  | P0       | Primary |
| Ubuntu LTS | Chromium | Latest  | P1       |         |

### macOS

| OS    | Browser | Version | Priority | Notes   |
| ----- | ------- | ------- | -------- | ------- |
| macOS (latest) | Safari  | Latest  | P0       | Primary |
| macOS (latest) | Chrome  | Latest  | P0       |         |
| macOS (latest) | Firefox | Latest  | P1       |         |

## 2. Mobile Platforms

### iOS / iPadOS

| OS  | Browser | Version | Priority | Notes       |
| --- | ------- | ------- | -------- | ----------- |
| iOS (latest) | Safari  | Latest  | P0       | Primary     |
| iOS (latest) | Chrome  | Latest  | P1       |             |
| iOS (latest) | Firefox | Latest  | P2       | Unsupported |

### Android

| OS               | Browser | Version | Priority | Notes       |
| ---------------- | ------- | ------- | -------- | ----------- |
| Android (latest) | Chrome  | Latest  | P0       | Primary     |
| Android (latest) | Firefox | Latest  | P2       | Unsupported |
