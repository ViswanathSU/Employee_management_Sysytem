import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('viswanath.suresh14@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Viswa@2004');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'Employees' }).click();
  await expect(page.getByText('Employee DashboardAdd')).toBeVisible();
  await page.getByRole('button', { name: 'Add Employee' }).click();
  await expect(page.getByRole('heading')).toContainText('Add Employee');
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Don');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('don14@gmail.com');
  await page.getByRole('combobox', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'MD' }).click();
  await page.getByRole('combobox', { name: 'Role' }).click();
  await page.getByRole('option', { name: 'UIUX' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('.MuiDataGrid-row.MuiDataGrid-row--lastVisible > div:nth-child(7) > .MuiStack-root > .MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary').click();
  await expect(page.getByRole('heading')).toContainText('Edit Employee');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});