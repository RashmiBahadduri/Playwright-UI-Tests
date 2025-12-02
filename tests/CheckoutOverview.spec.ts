import {test, expect} from '@playwright/test';
import { LoginPage } from '../PageObjects/loginpage';
import { productPage } from '../PageObjects/productpage';
import { qaEnvConfig } from '../utils/envConfig';
import { addproducts } from '../test-data/products';
import { cartpage } from '../PageObjects/cartpage';
import { checkoutpage } from '../PageObjects/checkoutpage';
import { checkoutdata } from '../test-data/checkoutdata';
import { checkoutoverviewpage } from '../PageObjects/checkoutoverviewpage';
import { title } from 'process';

  test.describe('CheckoutOverview Page Tests', () => {

    let loginPage: LoginPage;
    let ProductPage: productPage;
    let CartPage: cartpage;
    let CheckoutPage: checkoutpage;
    let CheckoutOverviewPage : checkoutoverviewpage;

    test.beforeEach( async ({page}) => {
        loginPage = new LoginPage(page);
        ProductPage = new productPage(page);
        CartPage = new cartpage(page);
        CheckoutPage = new checkoutpage(page);
        CheckoutOverviewPage = new checkoutoverviewpage(page);
        await page.goto('https://www.saucedemo.com/inventory.html');
        await ProductPage.addSpecificProduct(addproducts);
        await ProductPage.cartLink.click();
         await CartPage.checkOutButton.click();
        await CheckoutPage.fillCheckoutDetails(checkoutdata.firstName,checkoutdata.lastName,checkoutdata.zipCode);
        await CheckoutPage.clickContinueButton();
       
    });

test('Validate checkout overview page elements', async ({page}) => {
    expect(page.url()).toContain('/checkout-step-two.html');
    const checkoutOverviewUiElements = await CheckoutOverviewPage.getCheckoutOverviewPageElements();
    expect(checkoutOverviewUiElements.title).toBeVisible();
    expect(checkoutOverviewUiElements.finish).toBeVisible();
    expect(checkoutOverviewUiElements.cancel).toBeVisible();   

});

test('validate itemTotal price on checkout overview page', async () => {
  const checkoutProducts= await CheckoutOverviewPage.getCheckoutProductDetails();
  console.log ('Products on Checkout Overview Page:', checkoutProducts);
  const checkoutProductTotalPrice = checkoutProducts.reduce((sum, {price}) => sum+ parseFloat(price.replace('$', '')), 0);
  console.log('Total Price of Products on Checkout Overview Page:', checkoutProductTotalPrice);
  const expectedItemTotal = await CheckoutOverviewPage.getItemTotalText();
  console.log('Item Total from UI:', expectedItemTotal);
  expect(expectedItemTotal).toBe(checkoutProductTotalPrice);

});


test('validate total price including tax on checkout overview page', async () => {

const checkoutProducts= await CheckoutOverviewPage.getCheckoutProductDetails();
const checkoutProductTotalPrice = checkoutProducts.reduce((sum, {price}) => sum+ parseFloat(price.replace('$', '')), 0);
const tax = await CheckoutOverviewPage.getTaxText();
const expectedTotal = await CheckoutOverviewPage.getTotalText();
const totalWithTax = checkoutProductTotalPrice + tax;
console.log('Total Price including Tax:', totalWithTax);
expect(expectedTotal).toBe(totalWithTax);

});

test('Validate order confirmation on finish', async ({}) => {
    await CheckoutOverviewPage.clickFinishButton();    
    expect(CheckoutOverviewPage.checkOutCompleteTitle).toBeVisible();
    const orderConfirmationMessage = await CheckoutOverviewPage.getOrderConfirmationMessageText();
    expect(orderConfirmationMessage?.trim()).toBe('Thank you for your order!');

});




  });