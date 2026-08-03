import { test, expect } from '@playwright/test';
test('add todo', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button', { hasText: 'Add Todo' });

    await input.fill('New Todo');
    await addButton.click();

    const todoItem = page.locator('li').filter({ hasText: 'New Todo' });
    await expect(todoItem).toBeVisible();
});

test('toggle todo status', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button', { hasText: 'Add Todo' });

    await input.fill('New Todo');
    await addButton.click();

    const checkbox = page.locator('li').filter({ hasText: 'New Todo' }).locator('input[type="checkbox"]');
    await checkbox.check();

    const todoItem = page.locator('li').filter({ hasText: 'New Todo' }).locator('span');
    await expect(todoItem).toHaveClass(/line-through/);
});

test('delete todo', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('input[type="text"]');
    const addButton = page.locator('button', { hasText: 'Add Todo' });

    await input.fill('New Todo');
    await addButton.click();

    const deleteButton = page.locator('li').filter({ hasText: 'New Todo' }).locator('button', { hasText: 'X' });
    await deleteButton.click();

    const todoItem = page.locator('li').filter({ hasText: 'New Todo' });
    await expect(todoItem).toHaveCount(0);
});