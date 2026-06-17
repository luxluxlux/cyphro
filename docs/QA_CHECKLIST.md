# QA Checklist

This checklist defines the manual quality assurance process for the **Cyphro** web application before production release.

Checklist items include scope markers:

- **(D)** — Per Device / Browser
- **(R)** — Per Release
- **(C)** — On Change

Device and browser coverage is defined in [device coverage](https://github.com/luxluxlux/cyphro/blob/main/docs/DEVICE_COVERAGE.md).

## Prerequisites

Before starting QA, ensure:

- [ ] (R) All code changes merged to release branch
- [ ] (R) Unit tests complete successfully (`npm run test`)
- [ ] (R) Build completes successfully (`npm run build`)

## 1. Smoke Testing (Basic Availability)

- [ ] (D) Application loads without errors
- [ ] (D) Main UI elements render correctly
- [ ] (D) No critical errors in browser console on load

## 2. Core Flow

### 2.1 File Protection

- [ ] (D) User can select a file from the device
- [ ] (D) Protected file is generated successfully
- [ ] (D) Resulting file can be downloaded

### 2.2 File Unlocking

- [ ] (D) Protected file can be uploaded back into the app
- [ ] (D) Incorrect password is handled gracefully
- [ ] (D) Correct password restores the original file

### 2.3 File Disguising

- [ ] (D) User can select a disguise from the device
- [ ] (D) Disguised file is generated successfully
- [ ] (D) Resulting file behaves like the disguise

### 2.4 File Exposure

- [ ] (D) Disguised file can be uploaded back into the app
- [ ] (D) Incorrect password is handled gracefully
- [ ] (D) The original file is restored successfully

### 2.5 Shared Flow Behavior

- [ ] (D) Password input validation works correctly
  - Password is required
  - Minimum length is enforced
  - Maximum length is enforced
- [ ] (D) Password visibility toggle works correctly
- [ ] (D) Processed files are downloaded automatically after completion

## 3. File Handling

### 3.1 Protection

- [ ] (D) Supports main file types
  - Documents (pdf)
  - Images (jpg, png)
  - Audio (mp3)
  - Video (mp4)
- [ ] (D) Rejects restricted file types
  - Executable (exe, apk)
  - Scripts (bat, js)
  - Archives (zip, rar)
- [ ] (D) File validation works correctly
  - Folders are rejected
  - Empty files are rejected
  - File name is required
  - File extension is required
  - Files near the size limit are handled correctly
  - Files exceeding the size limit are rejected
- [ ] (D) File can be uploaded via drag & drop
- [ ] (D) File can be replaced with another file
- [ ] (D) File can be replaced via drag & drop
- [ ] (D) File validation is re-triggered after file replacement
- [ ] (D) Graceful error handling for corrupted files
- [ ] (C) Fails gracefully on timeout

### 3.2 Disguise

- [ ] (D) Supports permitted types
  - Documents (pdf)
  - Images (jpg, png)
  - Audio (mp3)
  - Video (mp4)
- [ ] (D) Rejects restricted file types
  - Plain (txt, html)
  - Read from the end (zip, rar)
- [ ] (D) Disguise validation works correctly
  - Folders are rejected
  - Empty files are rejected
  - File name is required
  - File extension is required
  - Files near the combined size limit (file + disguise) are handled correctly
  - Files exceeding the combined size limit (file + disguise) are rejected
- [ ] (D) Disguise can be replaced with another file
- [ ] (D) Disguise can be removed
- [ ] (D) Disguise validation is re-triggered after file replacement

## 4. Moderation

- [ ] (D) Supports image types (jpg, png, webp, gif, heic)
- [ ] (D) Non-image files are skipped by moderation
  - Documents (pdf, docx)
  - Audio (mp3, wav)
  - Video (mp4, avi)
- [ ] (C) Porn, sexy or hentai images are detected correctly
- [ ] (D) Allowed images pass moderation
- [ ] (D) High resolution image moderation does not slow down the UI
- [ ] (D) File moderation is triggered on upload
- [ ] (D) Disguise moderation is triggered on upload
- [ ] (D) Moderation restarts after file replacement
- [ ] (D) Moderation restarts after disguise replacement
- [ ] (D) User receives clear feedback on moderation failure
- [ ] (C) Completes successfully on timeout

## 5. Security & Privacy

- [ ] (R) Same file encrypted twice produces different outputs
- [ ] (R) Corrupted encrypted files are rejected
- [ ] (R) Incorrect password never reveals partial data
- [ ] (R) No sensitive data is exposed in the network requests
- [ ] (R) No sensitive data is exposed in the browser storage (cookie, local, session, etc.)

## 6. Error Handling

- [ ] (D) User-friendly error messages are shown
- [ ] (D) No raw stack traces exposed to the user
- [ ] (R) The error cause is displayed in the browser console
- [ ] (R) Errors do not leak technical or sensitive details

## 7. Performance

- [ ] (D) File processing time is acceptable for
  - Small files
  - Files with disguise
  - Moderated files
- [ ] (D) CPU usage remains reasonable during processing
- [ ] (D) UI remains responsive during processing
- [ ] (D) Repeated file selection does not slow down the UI

## 8. Browser & Environment Edge Cases

- [ ] (C) The page is rendered for search engines with JavaScript disabled
- [ ] (D) App works correctly in private/incognito mode
- [ ] (D) Reload during processing does not break the app
- [ ] (D) Rapid file and disguise re-selection does not cause state corruption
- [ ] (D) Unsupported browsers (Firefox for mobile) show fallback screen

## 9. Accessibility & UX

- [ ] (D) Logo links to the main page
- [ ] (D) Keyboard navigation works
- [ ] (D) Pop-up windows are opened, scrolled, and closed using the mouse, touch, and keyboard
- [ ] (D) Input fields and elements without text contain a title
- [ ] (D) Elements without text contain aria-label
- [ ] (R) No visible grammar or spelling mistakes
- [ ] (D) Error messages are readable and clear
- [ ] (D) Works on different screen sizes and orientations
- [ ] (D) The file name is shortened correctly
- [ ] (D) Social buttons open correct social media URLs

## 10. Web Quality Audit

### 10.1 Lighthouse

- [ ] (R) Lighthouse Performance score acceptable
- [ ] (R) Lighthouse Accessibility score acceptable
- [ ] (R) Lighthouse Best Practices score acceptable
- [ ] (R) Lighthouse SEO score acceptable

### 10.2 Structured Data

- [ ] (R) Structured data passes Google Rich Results Test
- [ ] (R) No critical schema validation errors

## 11. Regression Testing

- [ ] (R) Previously fixed bugs remain resolved
- [ ] (R) Core functionality remains unaffected by recent changes

## 12. Pre-Release Checklist

- [ ] (R) License and legal texts verified, change date updated
- [ ] (R) Meta tags and SEO texts checked
- [ ] (R) Site map updated
- [ ] (R) README.md updated
- [ ] (R) Version number updated and changes documented in CHANGELOG.md
- [ ] (R) Client dependencies updated and `npm audit` reviewed

## 13. Reporting

- [ ] (R) Bugs reported via GitHub Issues
