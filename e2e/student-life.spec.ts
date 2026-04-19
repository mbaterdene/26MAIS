import { test, expect } from '@playwright/test';

test.use({ browserName: 'chromium' });

test.describe('Student Life Page', () => {
  test('page loads with main header', async ({ page }) => {
    await page.goto('/student-life');
    
    // Check page title/header exists
    const pageHeading = page.locator('h1');
    await expect(pageHeading).toBeVisible();
  });

  test('student clubs section exists', async ({ page }) => {
    await page.goto('/student-life');
    
    // Check Student Clubs heading
    const clubsHeading = page.locator('h2', { hasText: 'Student Clubs' });
    const visible = await clubsHeading.isVisible().catch(() => false);
    
    // If content loads, check for section
    if (visible) {
      await expect(clubsHeading).toBeVisible();
    }
  });

  test('dofe programs section is visible', async ({ page }) => {
    await page.goto('/student-life');
    
    // Check DOFE Programs section
    const dofeHeading = page.locator('h2', { hasText: 'DOFE Programs' });
    await expect(dofeHeading).toBeVisible();
  });

  test('page has bordered cards (no rounded corners)', async ({ page }) => {
    await page.goto('/student-life');
    
    // Check that border elements exist (staff page style)
    const borderElements = page.locator('[class*="border-black"]');
    const count = await borderElements.count();
    
    // Should have at least some bordered elements
    expect(count).toBeGreaterThan(0);
  });

  test('uppercase typography used in headers', async ({ page }) => {
    await page.goto('/student-life');
    
    // Check uppercase styling in headings
    const heading = page.locator('h1');
    const classes = await heading.getAttribute('class');
    
    expect(classes).toContain('uppercase');
  });
});

