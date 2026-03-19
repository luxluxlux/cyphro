# Device Coverage

This document defines the supported devices, browsers, and environments
used for testing the **Cyphro**.

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

| OS | Browser | Version | Priority | Notes |
|---|---|---|---|---|
| Windows 11 | Chrome | Latest | P0 | Primary test browser |
| Windows 11 | Firefox | Latest | P1 | |
| Windows 11 | Edge | Latest | P1 | Chromium-based |
| Windows 10 | Chrome | Latest | P2 | Backward compatibility |

### Linux

| OS / Distro | Browser | Version | Priority | Notes |
|---|---|---|---|---|
| Ubuntu LTS | Chrome | Latest | P1 | Common desktop Linux setup |
| Ubuntu LTS | Firefox | Latest | P0 | Primary Linux browser |
| Ubuntu LTS | Chromium | Latest | P1 | |
| Fedora (latest) | Firefox | Latest | P2 | |

### macOS

| OS | Browser | Version | Priority | Notes |
|---|---|---|---|---|
| macOS (latest) | Safari | Latest | P0 | Memory limits |
| macOS (latest) | Chrome | Latest | P0 | |
| macOS (latest) | Firefox | Latest | P1 | |
| macOS (previous) | Safari | Latest | P1 | OS compatibility |

## 2. Mobile Platforms

### iOS / iPadOS

| OS | Browser | Version | Priority | Notes |
|---|---|---|---|---|
| iOS (latest) | Safari | Latest | P0 | Strict memory limits |
| iOS (latest) | Chrome | Latest | P1 | WebKit-based |
| iOS (latest) | Firefox | Latest | P2 | WebKit-based |
| iPadOS (latest) | Safari | Latest | P1 | Large file handling |

### Android

| OS | Browser | Version | Priority | Notes |
|---|---|---|---|---|
| Android (latest) | Chrome | Latest | P0 | Primary mobile browser |
| Android (latest) | Firefox | Latest | P1 | |
| Android (previous) | Chrome | Latest | P1 | OS fragmentation |

## 3. Special Browsing Modes

| Mode | Platform | Priority | Notes |
|---|---|---|---|
| Incognito / Private Mode | Desktop | P1 | Storage & memory behavior |
| Incognito / Private Mode | Mobile | P1 | File access limitations |

## 4. Performance & Resource Constraints

| Scenario | Platform | Priority | Notes |
|---|---|---|---|
| Low RAM device | Mobile | P0 | Encryption stability |
| Slow CPU | Desktop / Mobile | P1 | UI responsiveness |
| Large file processing | All | P0 | Memory & freeze checks |

## 5. Network Conditions

| Condition | Platform | Priority | Notes |
|---|---|---|---|
| Offline mode | All | P1 | App availability |
| Slow network | Mobile | P1 | Initial load only |
| Network drop during processing | All | P2 | Graceful handling |

## 6. Accessibility & Input Methods

| Scenario | Platform | Priority | Notes |
|---|---|---|---|
| Keyboard-only navigation | Desktop | P1 | Focus management |
| Touch-only interaction | Mobile | P0 | Buttons & gestures |
| Screen orientation change | Mobile | P1 | Layout stability |

## 7. Browser Features & Security

| Feature | Platform | Priority | Notes |
|---|---|---|---|
| File API support | All | P0 | Local file handling |
| Content Security Policy | Desktop | P1 | Privacy protection |
| Service Worker (if used) | All | P2 | Caching behavior |
