import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('doom14@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Viswa@2004');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.getByText('WorkNestHomeDetailsLogoutWelcome, DoomEmployee HomeDDoomTestingEmail:doom14@')).toBeVisible();
  await page.getByRole('button', { name: 'Details' }).click();
  await expect(page.getByText('WorkNestHomeDetailsLogoutUser')).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
});