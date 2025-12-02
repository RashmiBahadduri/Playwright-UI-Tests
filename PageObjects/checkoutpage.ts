import {Page,  Locator} from '@playwright/test';

export class checkoutpage{

    readonly page: Page;
    readonly checkoutTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly errormsg: Locator;
    


    constructor(page:Page){
        this.page = page;
        this.checkoutTitle = page.locator('.title');
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.cancelButton = page.locator('#cancel');
        this.continueButton = page.locator("#continue");
        this.errormsg = page.locator("h3[data-test='error']");
        

    }

    async getCheckoutPageElements(){

        return{
            title: this.checkoutTitle,
            firstName: this.firstNameInput,
            lastName: this.lastNameInput,
            zipCode: this.zipCodeInput,
            cancel: this.cancelButton,
            continue: this.continueButton
        }

    };

    async fillCheckoutDetails(firstName: string, lastName: string, zipCode: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);

    }


    async clickContinueButton(){
        await this.continueButton.click();
    };

    async clickCancelButton(){
        await this.cancelButton.click();
    };

    async getErrorMessageText(){
        return await this.errormsg.textContent();
    }

 
}