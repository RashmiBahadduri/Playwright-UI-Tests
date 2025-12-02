import {Page,  Locator} from '@playwright/test';

export class cartpage{

    readonly page: Page;
    readonly cartTitle: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkOutButton: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly removeButton: Locator;


    constructor(page: Page){
        this.page= page;
        this.cartTitle=  page.locator('.title');
        this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'}); 
        this.checkOutButton = page.getByRole('button', {name: 'Checkout'});
        this.productName = page.locator('.inventory_item_name');
        this.productDescription = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price'); 
        this.removeButton = page.locator('#remove-sauce-labs-bike-light');

    }

    // Get cart page UI elements
    async getCartPageElements(){
        return {
            title:  this.cartTitle,
            continueShopping : this.continueShoppingButton,
            checkOut : this.checkOutButton
         
        }
    }

    // Get all products added to the cart page
        async getCartProducts(){
            const allNames = await this.productName.allTextContents();
            const allDescriptions = await this.productDescription.allTextContents();
            const allPrices = await this.productPrice.allTextContents();

            const allCartProducts = allNames.map((_,i)=>({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allPrices[i].trim()      
            })
        )
        return allCartProducts;
        }

        async clickContinueShopping(){
            await this.continueShoppingButton.click();
        }

        async removeFirstProductsFromCart(){
            await this.removeButton.first().click();


        }
    


}