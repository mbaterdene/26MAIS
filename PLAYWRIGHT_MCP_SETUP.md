# Playwright MCP Setup Guide

This project is now configured with Playwright MCP (Model Context Protocol) server, enabling Claude to interact with your frontend application directly.

## What's Installed

- **Playwright** (`@playwright/test` and `playwright`): Browser automation framework
- **Playwright MCP Server**: Custom MCP server (`mcp-server-playwright.js`) allowing Claude to:
  - Navigate to pages
  - Take screenshots
  - Click elements
  - Fill forms and inputs
  - Extract text content
  - Wait for elements
  - Control the browser

## Configuration

### VS Code Settings
The MCP server is configured in `.vscode/settings.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": ["mcp-server-playwright.js"],
      "env": {
        "BROWSER_TYPE": "chromium"
      }
    }
  }
}
```

### Playwright Config
`playwright.config.ts` includes:
- Multiple browser engines (Chromium, Firefox, WebKit)
- Mobile device testing (iPhone, Pixel)
- Auto-start dev server on `http://localhost:5173`
- Screenshot and trace collection
- HTML test reporter

## Available npm Scripts

```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Interactive test UI
npm run test:ui

# Debug tests step-by-step
npm run test:debug
```

## How Claude Uses This

When you ask me to test your frontend, I can:

1. **Navigate and inspect**: Take screenshots of different pages
2. **Verify functionality**: Click buttons, fill forms, and check results
3. **Validate responsiveness**: Test on mobile and desktop viewports
4. **Test workflows**: Go through complete user journeys
5. **Catch regressions**: Verify changes don't break existing features

### Example Interaction
```
You: "Check if the admin login page works"

I can then:
1. Navigate to /admin/login
2. Fill in credentials
3. Click submit button
4. Take a screenshot
5. Verify we're on the admin dashboard
6. Report results back to you
```

## Test Structure

Tests go in the `e2e/` folder:
- `e2e/example.spec.ts` - Example tests
- Create more `.spec.ts` files as needed

## Browser Types

Adjust browser in `.vscode/settings.json`:
- `chromium` (default)
- `firefox`
- `webkit`

## Next Steps

1. **Create specific tests**: Add `.spec.ts` files in `e2e/` folder for your features
2. **Test the setup**: Run `npm test` to verify everything works
3. **Use with Claude**: When making frontend changes, I can use these tools to validate them

## Notes

- Dev server must be running for tests to work (`npm run dev`)
- Tests run against `http://localhost:5173` by default
- Screenshots are saved to `screenshots/` folder
- Test reports are in `playwright-report/`

## Troubleshooting

**Port already in use?**
Change `baseURL` in `playwright.config.ts` if your dev server runs on a different port.

**Browser not launching?**
Run `npx playwright install` to ensure browsers are installed.

**MCP server not connecting?**
Check that `mcp-server-playwright.js` is in the project root and paths are correct in `.vscode/settings.json`.
