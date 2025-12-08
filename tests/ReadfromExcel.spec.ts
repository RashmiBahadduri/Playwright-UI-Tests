import { test } from "@playwright/test";
import { LoginPage } from "../PageObjects/loginpage";
import * as XLSX from "xlsx";
import path from "path";

test("Read data from Excel file", async ({ page }) => {
  interface loginData {
    email: string;
    password: string;
  }

  const filePath = path.join(__dirname, "../test-data/saucelablogin.xlsx");
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets["Sheet1"];
  const sheetToJson = XLSX.utils.sheet_to_json<loginData>(worksheet);
  console.log(sheetToJson);
  const loginPage = new LoginPage(page);
  await page.goto("https://www.saucedemo.com/");
  await loginPage.usernameInput.fill(sheetToJson[0].email);
  await loginPage.passwordInput.fill(sheetToJson[0].password);
  await loginPage.loginButton.click();
});
