# PR Update Checker Chrome Extension

A Chrome extension that checks if a GitHub Pull Request is behind the main branch and displays a warning after the PR title.

## How it Works

The extension looks for an update button that appears on GitHub PR pages when the PR is behind the main branch. When detected, it adds a warning message after the PR title to alert users that the PR needs to be updated.

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extension directory
5. The extension is now installed and will run on GitHub PR pages

## Configuration

The extension uses selectors to find elements on GitHub pages. The current selectors are placeholders and may need to be updated:

- `UPDATE_BUTTON`: Selector for the button that appears when a PR needs to be updated
- `PR_TITLE`: Selector for the PR title element

Open the Extention's Option page and set the correcet selectors for the **PR's title** and the **Update button**. Currently (04 April 2025) the selectors are:
- Selector for the **PR's title**: `h1.gh-header-title`
- Selector for the **Update button**: `.prc-Button-ButtonBase-c50BI`

## Features

- Automatically detects when a PR is behind the main branch
- Displays a clear warning after the PR title
- Updates in real-time as the page changes
