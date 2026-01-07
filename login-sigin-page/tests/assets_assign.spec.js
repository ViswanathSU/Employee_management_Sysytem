import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('viswanath.suresh14@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Viswa@2004');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'Allocate' }).click();
  await page.locator('[id="_r_v_"]').click();
  await page.getByRole('option', { name: 'Laptop' }).click();
  await page.getByRole('spinbutton', { name: 'Total Quantity' }).click();
  await page.getByRole('spinbutton', { name: 'Total Quantity' }).fill('20');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});