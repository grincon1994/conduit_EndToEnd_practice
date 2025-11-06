import { test, expect, request } from '@playwright/test';
import { ArticlePage } from '../src/pages/ArticlePage';
import { tags } from '../data/tags.json';



test('modify tags', async ({ page, request }) => {
    const articlePage = new ArticlePage(page);
    await page.route('**/*/api/tags*', route => {
        route.fulfill({
            body: JSON.stringify({ tags })
        })
    })
    await articlePage.goto();
    await expect(page.locator('.tag-list .tag-default')).toContainText(tags)
})


test('Get /tags returns json array of strings', async ({ request }) => {
    const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
    await expect (response.ok()).toBeTruthy();
    const responseHeaders = response.headers();

    await expect(responseHeaders['content-type']).toContain('application/json')

    const responseBody = await response.json();
    const responseTags = responseBody.tags
    expect(Array.isArray(responseTags) && responseTags.every((tag) => typeof tag === 'string')).toBeTruthy();
})

