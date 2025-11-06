import { test as setup, expect, request} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import user from '../.auth/user.json';
import fs from 'fs';

const authFile ='.auth/user.json';

setup('authenticate', async ({ page, request }) => {
  // Perform authentication steps. Replace these actions with your own.
  // const lp = new LoginPage(page)
  // await lp.goto();
  // await lp.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!)
  // await expect(page.locator('.navbar-light .nav-link', {hasText: 'New Article'})).toBeVisible()

  // await page.context().storageState({ path: authFile });

  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      "user":{"email": process.env.TEST_USERNAME, "password": process.env.TEST_PASSWORD}
    }
  })

  const authResponseBody = await response.json();
  const token = authResponseBody.user.token;

  user.origins[0].localStorage[0].value = token;

  fs.writeFileSync(authFile, JSON.stringify(user))

  process.env['ACCESS_TOKEN'] = token;

})

