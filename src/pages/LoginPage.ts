import {test, expect, Page} from '@playwright/test';

export class LoginPage{
    readonly page; 

    constructor(page: Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('/login');
    }

    async login(username: string, password: string){
        await this.page.getByPlaceholder('Email').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', {name: 'Sign in'}).click()
    }
}

