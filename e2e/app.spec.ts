import { test, expect } from '@playwright/test';

test.describe('Pick One', () => {
  test('トップページが表示される', async ({ page }) => {
    await page.goto('/');

    // ページが正常に読み込まれることを確認
    await expect(page.locator('body')).toBeVisible();
  });
});
