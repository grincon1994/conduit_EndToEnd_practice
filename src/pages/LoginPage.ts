import {test, expect, Page, defineConfig} from '@playwright/test';

export class LoginPage{
    readonly page; 

    constructor(page: Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('/login');
    }

    async Login(username: string, password: string){
        await this.page.locator('navbar-nav nav-link', {hasText: 'Sign in'}).click()
        await this.page.getByPlaceholder('Email').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', {name: 'Sign in'}).click()
        await expect(this.page.locator('nav-link', {hasText: 'New Article'})).toBeVisible()
    }
}