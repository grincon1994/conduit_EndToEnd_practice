import {expect, Page} from '@playwright/test';


export class EditorPage {

    readonly page;

    constructor(page: Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('/editor');
    }

    async createNewArticle(title: string, about: string, article_description: string, tags: string[]){
        await this.goto()
        await this.page.getByPlaceholder('Article Title').fill(title);
        await this.page.getByPlaceholder('What\'s this article about?').fill(about);
        await this.page.getByPlaceholder('Write your article (in markdown)').fill(article_description);
        const tagInput = await this.page.getByPlaceholder('Enter tags')
        await tagInput.clear()
        for (const tag of tags){
            await tagInput.fill(tag);
            await tagInput.press('Enter');
        }
        await this.page.getByRole('button', {name: 'Publish Article'}).click();
        
    }
}