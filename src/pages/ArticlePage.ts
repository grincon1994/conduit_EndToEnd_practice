import {expect, Page} from '@playwright/test';

export class ArticlePage{
    readonly page;

    constructor(page:Page){
        this.page = page;
    }


    async goto(){
        await this.page.goto('/');
    }

    async verifyArticleIsDisplayed(title: string){
        await this.page.waitForTimeout(500);
        await expect(this.page.getByRole('heading', {name: `${title}`})).toContainText(title);
    }

    async toggleFavoriteArticle(){
        await this.goto();
        await this.page.locator('.btn-outline-primary').first().click()
    }
}