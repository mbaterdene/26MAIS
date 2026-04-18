#!/usr/bin/env node

/**
 * Playwright MCP Server
 * 
 * This server allows Claude to:
 * - Navigate to pages
 * - Take screenshots
 * - Interact with elements (click, fill, etc.)
 * - Extract text and page content
 * - Run tests
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  TextContent,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { chromium, firefox, webkit } from "playwright";
import * as fs from "fs";
import * as path from "path";

// Global browser instances
let browser = null;
let page = null;
const browserType = process.env.BROWSER_TYPE || "chromium";

const tools: Tool[] = [
  {
    name: "navigate",
    description: "Navigate to a URL",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL to navigate to",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "screenshot",
    description: "Take a screenshot of the current page",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Optional name for the screenshot file",
        },
      },
    },
  },
  {
    name: "click",
    description: "Click an element on the page",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector of the element to click",
        },
      },
      required: ["selector"],
    },
  },
  {
    name: "fill",
    description: "Fill in a text input",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector of the input element",
        },
        text: {
          type: "string",
          description: "Text to fill in",
        },
      },
      required: ["selector", "text"],
    },
  },
  {
    name: "get_text",
    description: "Get text content from an element or the entire page",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "Optional CSS selector. If not provided, gets all page text",
        },
      },
    },
  },
  {
    name: "wait_for_selector",
    description: "Wait for an element to appear on the page",
    inputSchema: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "CSS selector to wait for",
        },
        timeout: {
          type: "number",
          description: "Timeout in milliseconds (default: 5000)",
        },
      },
      required: ["selector"],
    },
  },
  {
    name: "close",
    description: "Close the browser",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

async function ensureBrowser() {
  if (!browser) {
    const bt =
      browserType === "firefox"
        ? firefox
        : browserType === "webkit"
          ? webkit
          : chromium;
    browser = await bt.launch();
    const context = await browser.newContext();
    page = await context.newPage();
  }
  return page;
}

async function handleToolCall(
  toolName: string,
  toolInput: Record<string, unknown>
) {
  const currentPage = await ensureBrowser();

  switch (toolName) {
    case "navigate": {
      const url = toolInput.url as string;
      await currentPage.goto(url);
      return new TextContent({
        type: "text",
        text: `Navigated to ${url}`,
      });
    }

    case "screenshot": {
      const name = (toolInput.name as string) || "screenshot";
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `screenshots/${name}-${timestamp}.png`;
      const dir = path.dirname(filename);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await currentPage.screenshot({ path: filename });
      return new TextContent({
        type: "text",
        text: `Screenshot saved to ${filename}`,
      });
    }

    case "click": {
      const selector = toolInput.selector as string;
      await currentPage.click(selector);
      return new TextContent({
        type: "text",
        text: `Clicked element: ${selector}`,
      });
    }

    case "fill": {
      const selector = toolInput.selector as string;
      const text = toolInput.text as string;
      await currentPage.fill(selector, text);
      return new TextContent({
        type: "text",
        text: `Filled "${selector}" with "${text}"`,
      });
    }

    case "get_text": {
      const selector = toolInput.selector as string | undefined;
      let text: string;

      if (selector) {
        text = await currentPage.textContent(selector);
      } else {
        text = await currentPage.evaluate(() => document.body.innerText);
      }

      return new TextContent({
        type: "text",
        text: text || "(no text found)",
      });
    }

    case "wait_for_selector": {
      const selector = toolInput.selector as string;
      const timeout = (toolInput.timeout as number) || 5000;
      await currentPage.waitForSelector(selector, { timeout });
      return new TextContent({
        type: "text",
        text: `Element appeared: ${selector}`,
      });
    }

    case "close": {
      if (browser) {
        await browser.close();
        browser = null;
        page = null;
      }
      return new TextContent({
        type: "text",
        text: "Browser closed",
      });
    }

    default:
      return new TextContent({
        type: "text",
        text: `Unknown tool: ${toolName}`,
      });
  }
}

async function main() {
  const transport = new StdioServerTransport();
  const server = new Server(
    {
      name: "playwright-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = await handleToolCall(
        request.params.name,
        request.params.arguments
      );
      return {
        content: [result],
      };
    } catch (error) {
      return {
        content: [
          new TextContent({
            type: "text",
            text: `Error: ${(error as Error).message}`,
          }),
        ],
        isError: true,
      };
    }
  });

  await server.connect(transport);
  console.error("Playwright MCP server running on stdio");
}

main().catch(console.error);
