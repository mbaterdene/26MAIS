import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  // Add assertions here
  expect(page).toBeTruthy();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  // Example: click a navigation link
  // await page.click('a[href="/about"]');
  // await expect(page).toHaveURL(/.*about/);
});
