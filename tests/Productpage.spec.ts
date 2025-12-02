import {test, expect} from '@playwright/test';
import { LoginPage } from '../PageObjects/loginpage';
import { productPage } from '../PageObjects/productpage';
import { qaEnvConfig } from '../utils/envConfig';
import { addproducts } from '../test-data/products';




   test.describe('Product Page Tests', () => {

    let loginPage: LoginPage;
    let ProductPage: productPage;

    test.beforeEach( async ({page}) => {
        loginPage = new LoginPage(page);
        ProductPage = new productPage(page);
    });


test('Verify navigation to about page and back to product page', async ({page}) => {

   await page.goto('https://www.saucedemo.com/inventory.html');
   await ProductPage.openAboutPage();
   await expect(page).toHaveURL('https://saucelabs.com/');
   await expect(ProductPage.requestDemoButton).toBeVisible();
   await page.goBack();
   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    



});

test('Verify products are displayed', async ({page}) => {


   await page.goto('https://www.saucedemo.com/inventory.html');
   await page.waitForTimeout(10000);
   expect(ProductPage.productName.first()).toBeVisible;
    await ProductPage.validateProductDisplay();

});

test('Add specific products to cart', async ({page}) => {

    
    await page.goto('https://www.saucedemo.com/inventory.html');
    await ProductPage.addSpecificProduct(addproducts);
    const number = page.locator('.shopping_cart_badge').innerText();
    console.log(`number of items in cart: ${number}`);

});


test('Verify product sorting A to Z', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await ProductPage.selectFilterAtoZ();
    const pnames = await ProductPage.getProductNames();
    const sortedNames = [...pnames].sort();
    expect(pnames).toEqual(sortedNames);

});


test('Verify product sorting Z to A', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await ProductPage.selectFilterZtoA();
    const pnames = await ProductPage.getProductNames();
    const sortedNames = [...pnames].sort().reverse();
    expect(pnames).toEqual(sortedNames);

});


test('Verify product sorting low to high', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await ProductPage.selectPriceLowToHigh();
    const price = await ProductPage.getProductPrices();
    console.log(`prices: ${price}`);
    const sortedprices= [...price].sort((a,b) => a-b);
    console.log(`sorted prices: ${sortedprices}`);
    expect(price).toEqual(sortedprices);
    

});


test('Verify product sorting high to low', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await ProductPage.selectPriceHighToLow();
    const price = await ProductPage.getProductPrices();
    console.log(`prices: ${price}`);
    const sortedprices= [...price].sort((a,b) => b-a);
    console.log(`sorted prices: ${sortedprices}`);
    expect(price).toEqual(sortedprices);
    

});


})


