import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('login', async({page}) => {
    const login = new LoginPage(page)
    await login.goto();
    await login.Login(process.env.USERNAME!, process.env.PASSWORD!)
})