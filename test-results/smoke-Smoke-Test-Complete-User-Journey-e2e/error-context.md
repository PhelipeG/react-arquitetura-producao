# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ../testing/e2e/smoke.spec.ts >> Smoke Test >> Complete User Journey
- Location: testing/e2e/smoke.spec.ts:14:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 120000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]: "Unexpected Server Error TypeError: Cannot destructure property 'locale' of '(0 , __vite_ssr_import_5__.useLoaderData)(...)' as it is undefined."
```

# Test source

```ts
  1   | import { test, expect } from '../fixtures/e2e.fixture';
  2   | import { generateIdea, generateReview, generateUser } from '../test-data';
  3   |
  4   | test.describe('Smoke Test', () => {
  5   |   const testUser = {
  6   |     ...generateUser(),
  7   |     password: 'password123',
  8   |   };
  9   |
  10  |   const testIdea = generateIdea();
  11  |   const testReview = generateReview();
  12  |   const updatedReviewContent = 'Updated review content';
  13  |
  14  |   test('Complete User Journey', async ({ page }) => {
  15  |     test.setTimeout(120_000);
  16  |
  17  |     await test.step('register a new user', async () => {
  18  |       await page.goto('/auth/register');
  19  |
  20  |       const usernameInput = page.getByRole('textbox', { name: 'Username' });
  21  |       await expect(usernameInput).toBeVisible();
  22  |
  23  |       await usernameInput.fill(testUser.username);
  24  |       await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);
  25  |       await page.getByLabel('Password').fill(testUser.password);
  26  |
  27  |       await Promise.all([
> 28  |         page.waitForResponse(
      |              ^ Error: page.waitForResponse: Test timeout of 120000ms exceeded.
  29  |           (response) =>
  30  |             response.url().includes('/auth/register') &&
  31  |             response.request().method() === 'POST' &&
  32  |             response.ok(),
  33  |         ),
  34  |         page.getByRole('button', { name: 'Register' }).click(),
  35  |       ]);
  36  |
  37  |       await expect(page).toHaveURL('/dashboard');
  38  |     });
  39  |
  40  |     await test.step('log out the user', async () => {
  41  |       await page.getByRole('button', { name: 'Logout' }).click();
  42  |       await expect(page).toHaveURL('/auth/login');
  43  |     });
  44  |
  45  |     await test.step('login with the same user', async () => {
  46  |       await expect(page).toHaveURL('/auth/login');
  47  |
  48  |       await page.getByRole('textbox', { name: 'Email' }).fill(testUser.email);
  49  |       await page.getByLabel('Password').fill(testUser.password);
  50  |
  51  |       await page.getByRole('button', { name: 'Log In' }).click();
  52  |
  53  |       await expect(page).toHaveURL('/dashboard');
  54  |     });
  55  |
  56  |     await test.step('create a new idea', async () => {
  57  |       await page.getByRole('link', { name: 'My Ideas' }).click();
  58  |       await expect(page).toHaveURL('/dashboard/ideas');
  59  |
  60  |       await page.getByRole('link', { name: 'New Idea' }).click();
  61  |       await expect(page).toHaveURL('/dashboard/ideas/new');
  62  |
  63  |       await page.getByRole('textbox', { name: 'Title' }).fill(testIdea.title);
  64  |       await page
  65  |         .getByRole('textbox', { name: 'Short Description' })
  66  |         .fill(testIdea.shortDescription);
  67  |       await page
  68  |         .getByRole('textbox', { name: 'Detailed Description' })
  69  |         .fill(testIdea.description);
  70  |       for (const tag of ['API', 'Automation']) {
  71  |         await page.getByRole('button', { name: tag }).click();
  72  |       }
  73  |
  74  |       await page.getByRole('button', { name: 'Create Idea' }).click();
  75  |       await expect(page).toHaveURL('/dashboard/ideas');
  76  |
  77  |       const createdIdeaLink = page
  78  |         .getByTestId('idea-list-item')
  79  |         .filter({ hasText: testIdea.title })
  80  |         .getByRole('heading')
  81  |         .getByRole('link');
  82  |
  83  |       const createdIdeaHref = await createdIdeaLink.getAttribute('href');
  84  |       expect(createdIdeaHref).toMatch(/\/ideas\/[^/]+$/);
  85  |       testIdea.id = createdIdeaHref!.split('/').pop()!;
  86  |     });
  87  |
  88  |     await test.step('edit the idea', async () => {
  89  |       await page.goto(`/ideas/${testIdea.id}`);
  90  |       await expect(page).toHaveURL(`/ideas/${testIdea.id}`);
  91  |
  92  |       await page.getByRole('button', { name: 'Idea actions' }).click();
  93  |       await page.getByRole('menuitem', { name: 'Edit Idea' }).click();
  94  |       await expect(page).toHaveURL(`/dashboard/ideas/${testIdea.id}/edit`);
  95  |
  96  |       testIdea.title = `${testIdea.title} - Updated`;
  97  |       testIdea.shortDescription = `${testIdea.shortDescription} - Updated`;
  98  |
  99  |       await page.getByRole('textbox', { name: 'Title' }).fill(testIdea.title);
  100 |       await page
  101 |         .getByRole('textbox', { name: 'Short Description' })
  102 |         .fill(testIdea.shortDescription);
  103 |       await page.getByRole('button', { name: 'Update Idea' }).click();
  104 |       await expect(page).toHaveURL(`/ideas/${testIdea.id}`);
  105 |     });
  106 |
  107 |     await test.step('delete the idea', async () => {
  108 |       await page.getByRole('button', { name: 'Idea actions' }).click();
  109 |       await page.getByRole('menuitem', { name: 'Delete Idea' }).click();
  110 |
  111 |       const confirmDeleteDialog = page.getByRole('alertdialog', {
  112 |         name: 'Delete Idea',
  113 |       });
  114 |       await confirmDeleteDialog.getByRole('button', { name: 'Delete' }).click();
  115 |       await expect(page).toHaveURL('/dashboard/ideas');
  116 |       await expect(
  117 |         page.getByRole('link', { name: testIdea.title }),
  118 |       ).not.toBeVisible();
  119 |     });
  120 |
  121 |     await test.step('discover ideas', async () => {
  122 |       await page
  123 |         .getByRole('navigation', { name: 'Main' })
  124 |         .getByRole('link', { name: /^Ideas$/ })
  125 |         .click();
  126 |       await expect(page).toHaveURL('/ideas');
  127 |
  128 |       const discoveredIdeaLink = page
```
