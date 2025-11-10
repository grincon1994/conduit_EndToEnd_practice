import { test, expect } from '@playwright/test';
import { EditorPage } from '../src/pages/EditorPage';
import { ArticlePage } from '../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';


    test('create article, check presence of article title, navigate to favorite posts and delete article created', async ({ page, request }) => {
        const randomTitle = faker.lorem.words({ min: 2, max: 4 })
        const randomArticleSubject = faker.lorem.sentence({ min: 3, max: 4 });
        const randomArticleDescription = faker.lorem.paragraphs({ min: 1, max: 2 })
        const randomArticleTags: string[] = faker.lorem.words({ min: 1, max: 3 }).split(' ')

        const editor = new EditorPage(page)
        await editor.createNewArticle(randomTitle, randomArticleSubject, randomArticleDescription, randomArticleTags);
        // await page.waitForTimeout(1000);

        const article = new ArticlePage(page)
        await article.verifyArticleIsDisplayed(randomTitle);
        await article.toggleFavoriteArticle();
        await page.locator('.navbar-light .nav-link', { hasText: 'standard_user' }).click();
        await page.locator('.articles-toggle .nav-link', { hasText: 'Favorited Posts' }).click();
        await expect(page.getByRole('heading', { name: randomTitle })).toHaveText(randomTitle);

        const articlePageResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
        const articleResponseBody = await articlePageResponse.json();
        const articleSlugId = articleResponseBody.article.slug;


        
        const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlugId}`, {
            headers:{
                'Authorization': `Token ${process.env.ACCESS_TOKEN}`
            }
        })
        // await expect(deleteArticleResponse.status()).toBe(204);
    })


