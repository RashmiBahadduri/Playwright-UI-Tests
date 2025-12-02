import {test, expect} from '@playwright/test';
import { LoginPage } from '../PageObjects/loginpage';
import { productPage } from '../PageObjects/productpage';
import { qaEnvConfig } from '../utils/envConfig';
import { addproducts } from '../test-data/products';
import { cartpage } from '../PageObjects/cartpage';

  test.describe('Cart Page Tests', () => {

    let loginPage: LoginPage;
    let ProductPage: productPage;
    let CartPage: cartpage;

    test.beforeEach( async ({page}) => {
        loginPage = new LoginPage(page);
        ProductPage = new productPage(page);
        CartPage = new cartpage(page);
    });

test('Verify UI elements in the cart page', async ({page}) => {

   await page.goto('https://www.saucedemo.com/inventory.html');
   await ProductPage.addFirstProductToCart();
   await ProductPage.cartLink.click();
   await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
   const cartUiElements = await CartPage.getCartPageElements();
   await expect(cartUiElements.title).toBeVisible();
   await expect(cartUiElements.continueShopping).toBeVisible();
   await expect(cartUiElements.checkOut).toBeVisible();

});



test('Verify continue shopping button navigation in the cart page', async ({page}) => {
 await page.goto('https://www.saucedemo.com/inventory.html');
   await ProductPage.addFirstProductToCart();
   await ProductPage.cartLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
   await CartPage.clickContinueShopping();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); 


});


test('Validate first product details added to the cart page', async ({page}) => {

    await page.goto('https://www.saucedemo.com/inventory.html');
    const firstProduct = await ProductPage.getFirstProductDetails();    
    await ProductPage.addFirstProductToCart();
    await ProductPage.cartLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartProducts = await CartPage.getCartProducts();
      expect(cartProducts[0].name).toBe(firstProduct.name);
    expect(cartProducts[0].description).toBe(firstProduct.description);
    expect(cartProducts[0].price).toBe(firstProduct.price);

  });


  test('Validate all products added to the cart page', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const allProducts = await ProductPage.getAllProductDetails();
    await ProductPage.addAllProductsToCart();
    await ProductPage.cartLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartProducts = await CartPage.getCartProducts();
    await expect(cartProducts.length).toBe(allProducts.length);
    await expect(cartProducts).toEqual(allProducts);


});

test('Validate specific product details added to the cart page', async ({page}) => {

    await page.goto('https://www.saucedemo.com/inventory.html');
    const specificProducts = await ProductPage.getSpecificProduct(addproducts);
    await ProductPage.addSpecificProduct(addproducts);
    await ProductPage.cartLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const cartProducts = await CartPage.getCartProducts();
    await expect(cartProducts.length).toBe(specificProducts.length);
    await expect(cartProducts).toEqual(specificProducts);



});


test('Remove product from the cart page', async ({page}) => {

    await page.goto('https://www.saucedemo.com/inventory.html');
    await ProductPage.addAllProductsToCart();
    await ProductPage.cartLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    const initialProducts = await CartPage.getCartProducts();
    console.log(`Initial products in cart: ${initialProducts}`);
    expect(initialProducts.length).toBeGreaterThan(0);
    await CartPage.removeFirstProductsFromCart();
    const updatedProducts = await CartPage.getCartProducts();
    expect(updatedProducts.length).toEqual(initialProducts.length - 1);
    
});

  });
