import { test, expect } from '@playwright/test';

test.describe.serial('BMI Health Tracker Full Flow', () => {
  const timestamp = Date.now();
  const username = `user_${timestamp}`;
  const email = `user_${timestamp}@example.com`;
  const password = 'Password123!';

  test('Case 1: User Registration', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Register")');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(`Signed in as`)).toBeVisible();
    await expect(page.getByText(username)).toBeVisible();
  });

  test('Case 2: User Logout', async ({ page }) => {
    // Assuming we are logged in from previous test (storage state is not automatically shared between tests in default config unless configured, 
    // BUT in 'serial' mode with same worker, we might need to persist cookies or just re-login if context is fresh.
    // Playwright creates a new context for each test by default even in serial.
    // So we need to Login first if we want to test Logout in isolation, or Register again.
    // To make these 5 distinct cases valid and independent-ish:
    
    // Let's just Re-Login for the "Logout" test to be robust.
    await page.goto('/login');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL(/\/dashboard/);

    // Now perform logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('Case 3: User Login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Login")');
    
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('BMI Tracker')).toBeVisible();
  });

  test('Case 4: Add BMI Record', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Login")');

    // Fill form
    await page.fill('input[name="height"]', '175'); // 175cm
    await page.fill('input[name="weight"]', '70');  // 70kg
    await page.click('button:has-text("Calculate & Save")');

    // Verify it appears in the latest stats or table
    // BMI = 70 / (1.75 * 1.75) = 22.86
    await expect(page.getByText('22.9')).toBeVisible(); 
    // Expect 'Normal' to appear (might appear multiple times, e.g. in stats and table)
    await expect(page.getByText('Normal', { exact: true }).first()).toBeVisible();
  });

  test('Case 6: Login with Incorrect Credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button:has-text("Login")');
    
    // Should stay on login page and show error (assuming error message is implemented)
    // Checking app/login/page.tsx: {state?.error && ...}
    // Checking app/actions/auth.ts: returns { error: 'Invalid credentials' }
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('Case 5: Check Reports Page', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Login")');

    // Navigate to Reports
    await page.click('text=Reports');
    await expect(page).toHaveURL(/\/dashboard\/reports/);
    
    // Check for report elements
    await expect(page.getByText('Health Summary')).toBeVisible();
    await expect(page.getByText('Average BMI')).toBeVisible();
  });
});
