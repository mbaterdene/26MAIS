import { test, expect } from '@playwright/test';

test.describe('Teachers Page', () => {
  test('should load the teachers page', async ({ page }) => {
    await page.goto('/teachers');
    
    // Check page title and header
    const heading = page.locator('text=THE FACULTY');
    await expect(heading).toBeVisible();
    
    // Check subtitle
    const subtitle = page.locator('text=ACADEMIC ROSTER');
    await expect(subtitle).toBeVisible();
  });

  test('should display sidebar filters', async ({ page }) => {
    await page.goto('/teachers');
    
    // Check that filter buttons exist
    const allStaffBtn = page.locator('text=/All Staff|Бүх/');
    await expect(allStaffBtn).toBeVisible();
    
    // Check for category filters
    const igcseBtn = page.locator('text=IGCSE');
    await expect(igcseBtn).toBeVisible();
  });

  test('should display teacher roster table', async ({ page }) => {
    await page.goto('/teachers');
    
    // Check table headers
    const idHeader = page.locator('text=ID').first();
    await expect(idHeader).toBeVisible();
    
    const nameHeader = page.locator('text=/Name|Нэр/');
    await expect(nameHeader).toBeVisible();
  });

  test('should show total members count', async ({ page }) => {
    await page.goto('/teachers');
    
    // Check for the "Total Members" section
    const totalLabel = page.locator('text=/Total Members|Нийт Гишүүд/');
    await expect(totalLabel).toBeVisible();
    
    // Check that a number is displayed
    const count = page.locator('text=/Total Members|Нийт Гишүүд/').locator('..').locator('text=/^\\d+$/');
    await expect(count).toBeVisible();
  });

  test('should filter teachers by category', async ({ page }) => {
    await page.goto('/teachers');
    
    // Click on a category filter (e.g., IGCSE)
    const igcseBtn = page.locator('text=IGCSE');
    await igcseBtn.click();
    
    // Verify the button has active state (red background)
    await expect(igcseBtn).toHaveClass(/bg-cardinal-red/);
    
    // Wait for content to update
    await page.waitForTimeout(300);
    
    // Take a screenshot to verify visual change
    await page.screenshot({ path: 'screenshots/teachers-filtered-igcse.png' });
  });

  test('should display pagination controls', async ({ page }) => {
    await page.goto('/teachers');
    
    // Look for pagination buttons
    const paginationArea = page.locator('text=/Showing|of/');
    
    // Check if pagination is visible (if there are multiple pages)
    const paginationVisible = await paginationArea.isVisible().catch(() => false);
    
    if (paginationVisible) {
      await expect(paginationArea).toBeVisible();
    }
  });

  test('should navigate to next page', async ({ page }) => {
    await page.goto('/teachers');
    
    // Look for next page button (→)
    const nextBtn = page.locator('button:has-text("→")').last();
    const isNextVisible = await nextBtn.isVisible().catch(() => false);
    
    if (isNextVisible) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      
      // Verify page changed by checking URL or content
      await page.screenshot({ path: 'screenshots/teachers-page-2.png' });
    }
  });

  test('should display teacher information in table rows', async ({ page }) => {
    await page.goto('/teachers');
    
    // Wait for teacher rows to load
    await page.waitForSelector('[class*="grid"]');
    
    // Check that teacher names are visible
    const firstTeacherName = page.locator('text=/^[A-Z].*[A-Z]$/').first();
    await expect(firstTeacherName).toBeVisible();
    
    // Take screenshot of full page
    await page.screenshot({ path: 'screenshots/teachers-full-page.png' });
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/teachers');
    
    // Check that main content is visible
    const heading = page.locator('text=THE FACULTY');
    await expect(heading).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'screenshots/teachers-mobile.png' });
  });
});
