import {test, expect} from '@playwright/test';
import { LoginPage } from '../PageObjects/loginpage';
import { qaEnvConfig } from '../utils/envConfig';

test('Login to Saucedemo using valid credentials', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await page.goto(qaEnvConfig.BASE_URL);

    // Enter username
    await loginPage.login(qaEnvConfig.Username, qaEnvConfig.Password);
       await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveTitle('Swag Labs');
        await context.storageState({ path: 'storageState.json' });

   



})