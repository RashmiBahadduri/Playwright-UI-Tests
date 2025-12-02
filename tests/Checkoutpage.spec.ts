import {test, expect} from '@playwright/test';
import { LoginPage } from '../PageObjects/loginpage';
import { productPage } from '../PageObjects/productpage';
import { qaEnvConfig } from '../utils/envConfig';
import { addproducts } from '../test-data/products';
import { cartpage } from '../PageObjects/cartpage';
import { checkoutpage } from '../PageObjects/checkoutpage';
import { checkoutdata } from '../test-data/checkoutdata';

  test.describe('Checkout Page Tests', () => {

    let loginPage: LoginPage;
    let ProductPage: productPage;
    let CartPage: cartpage;
    let CheckoutPage: checkoutpage

    test.beforeEach( async ({page}) => {
        loginPage = new LoginPage(page);
        ProductPage = new productPage(page);
        CartPage = new cartpage(page);
        CheckoutPage = new checkoutpage(page);
        await page.goto('https://www.saucedemo.com/inventory.html');
        await ProductPage.addFirstProductToCart();
        await ProductPage.cartLink.click();
       
    });

test('Validate checkout page elements', async ({page}) => {
    await CartPage.checkOutButton.click();
    const checkoutUiElements = await CheckoutPage.getCheckoutPageElements();
    expect(checkoutUiElements.title).toBeVisible();
    expect(checkoutUiElements.firstName).toBeVisible();
    expect(checkoutUiElements.lastName).toBeVisible();
    expect(checkoutUiElements.zipCode).toBeVisible();
    expect(checkoutUiElements.continue).toBeVisible();
    expect(checkoutUiElements.cancel).toBeVisible();      

});

test.only('Validate error message on continue without entering details', async () => {
    
    await CartPage.checkOutButton.click();
    await CheckoutPage.clickContinueButton();
    const errorMessage = await CheckoutPage.getErrorMessageText();
    expect(errorMessage?.trim()).toBe('Error: First Name is required');

});




  });