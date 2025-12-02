import { Page, Locator } from '@playwright/test';

export class productPage {
    readonly page: Page;
    readonly aboutLink: Locator;
    readonly requestDemoButton: Locator;
    readonly menuButton: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly filterDropdown: Locator;
    readonly cartLink: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.aboutLink = page.getByRole('link', { name: 'About' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.requestDemoButton = page.getByRole('button', { name: 'Request a demo' });
        this.productName = page.locator('.inventory_item_name');
        this.productDescription = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price'); 
        this.addToCartButton = page.locator('.btn_inventory');  
        this.filterDropdown = page.locator('.product_sort_container');
        this.cartLink = page.locator('.shopping_cart_link')

    }

    async openAboutPage() {
        await this.menuButton.click();
        await this.aboutLink.click();
    };

    // Validate that products are displayed with name, description, price, and add to cart button
    async validateProductDisplay() {
        const productNames= await this.productName.allTextContents();
        console.log(`product names: ${productNames}`);
       const productDescriptions =  await this.productDescription.allTextContents();
       console.log(`product descriptions: ${productDescriptions}`);
        const prices = await this.productPrice.allTextContents();
        console.log(`product prices: ${prices}`);
        const buttonCount= await this.addToCartButton.count();
        console.log(`button count: ${buttonCount}`);

        if(productNames.length !== productDescriptions.length || productNames.length !== prices.length || productNames.length !== buttonCount)
            throw new Error('number of product details do not match')
        

    if(productNames.length === 0)
        throw new Error('no product found')
    
    }

    async addFirstProductToCart() {
            await this.addToCartButton.first().click();

    }

// Add specific products to cart based on an array of product names
    async addSpecificProduct(product: string[]) {
        const count= await this.productName.count();
        for (let i=0; i<count; i++) {
            const name = await this.productName.nth(i).textContent();
            if (name && product.includes(name.trim())) {
                await this.addToCartButton.nth(i).click();
                await this.page.waitForTimeout(3000);
                
            }
        }
    }

    // Filter products using the dropdown
    async selectFilterAtoZ() {
        await this.filterDropdown.selectOption('az');
    }

    async selectFilterZtoA() {
        await this.filterDropdown.selectOption('za');
    }

    async selectPriceLowToHigh() {
        await this.filterDropdown.selectOption('lohi');
    }

    async selectPriceHighToLow() {
        await this.filterDropdown.selectOption('hilo');
    }

    async getProductNames(): Promise<string[]> {
        return await this.productName.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrice.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    // Get details of the first product
    async getFirstProductDetails(){

        const name = await this.productName.first().textContent();
        const description = await this.productDescription.first().textContent();
        const price = await this.productPrice.first().textContent();
        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        };

    }

    // Get details of all products

        async getAllProductDetails(){
            const allNames = await this.productName.allTextContents();
            const allDescriptions = await this.productDescription.allTextContents();
            const allPrices = await this.productPrice.allTextContents();

            const allProducts = allNames.map((_,i)=>({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allPrices[i].trim()      
            })
        )
        return allProducts;
        }


        // Get details of specific products based on an array of product names
        async getSpecificProduct(productName: string[]){  

            const allNames = await this.productName.allTextContents();
            const allDescriptions = await this.productDescription.allTextContents();
            const allPrices = await this.productPrice.allTextContents();

            const allProducts = allNames.map((_,i)=>({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allPrices[i].trim()      
            }))
            return allProducts.filter(p => productName.includes(p.name));

        }

// Add all products to cart
        async addAllProductsToCart(){
            const count= await this.addToCartButton.count();
            for (let i=0; i<count; i++) {
                    await this.addToCartButton.nth(i).click();
                    await this.page.waitForTimeout(2000);
                    
                    
            }   


        }






}
    
