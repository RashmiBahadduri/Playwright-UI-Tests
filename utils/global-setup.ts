import { chromium, type FullConfig } from '@playwright/test';
import { LoginPage } from '../PageObjects/loginpage';
import { qaEnvConfig } from '../utils/envConfig';

// Global setup to perform login and save storage state

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);
    await page.goto(qaEnvConfig.BASE_URL);
    await loginPage.login(qaEnvConfig.Username, qaEnvConfig.Password);
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;