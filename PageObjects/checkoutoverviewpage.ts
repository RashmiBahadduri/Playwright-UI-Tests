import {Page,  Locator} from '@playwright/test';

export class checkoutoverviewpage{

    readonly page: Page;
    readonly checkoutTitle: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly productName: Locator;
    readonly productDesc: Locator;
    readonly productPrice: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly orderConfirmationMsg: Locator;
    readonly checkOutCompleteTitle: Locator;

    constructor(page:Page){
        this.page = page;
        this.checkoutTitle = page.locator('.title');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.productName = page.locator('.inventory_item_name');
        this.productDesc = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
        this.orderConfirmationMsg = page.locator('.complete-header');
        this.checkOutCompleteTitle = page.locator('.title');
    }   

    async getCheckoutOverviewPageElements(){

        return{
            title: this.checkoutTitle,
            finish: this.finishButton,
            cancel: this.cancelButton
        }
    }

    async getCheckoutProductDetails(){
            const allNames = await this.productName.allTextContents();
            const allDescriptions = await this.productDesc.allTextContents();
            const allPrices = await this.productPrice.allTextContents();

            const allCheckoutProducts = allNames.map((_,i)=>({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allPrices[i].trim()      
            })
        )
        return allCheckoutProducts;


    }


    async clickFinishButton(){
        await this.finishButton.click();
    }

    async clickCancelButton(){
        await this.cancelButton.click();
    }

    async getItemTotalText(){
        const text = await this.itemTotal.textContent();
       return parseFloat((text ?? '0').replace('Item total: $', "").trim());        
    }

    async getTaxText(){
        const text = await this.tax.textContent();
        return parseFloat(text!.replace('Tax: $',"").trim());        
    }

    async getTotalText(){
        const text = await this.total.textContent();
        return parseFloat(text!.replace('Total: $',"").trim());        
    }

       async getOrderConfirmationMessageText(){
        return await this.orderConfirmationMsg.textContent();
    }


}