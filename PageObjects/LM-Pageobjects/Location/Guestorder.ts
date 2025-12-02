import { expect, type Locator, type Page } from '@playwright/test';


export class storeLocation{

   readonly page: Page;
   readonly guestLink: Locator;
   readonly orderType: Locator;
   readonly carryout: Locator;
   readonly delivery: Locator;
   readonly curbside: Locator;
   readonly storeFindText: Locator;
   readonly useCurrentLocation: Locator;
   readonly searchLocation: Locator;
   readonly storeOptions: Locator;
   readonly switchOrderType: Locator;
   readonly carryoutFrom: Locator;
   readonly store: Locator;
   readonly asapOption: Locator;
   readonly scheduleOPtion: Locator;
   readonly locationDropdown: Locator;
   readonly locationDropdownLists: Locator;
   



constructor(page: Page){

this.page = page;
this.guestLink = page.getByRole('button', {name : 'Or continue in guest mode' });
this.orderType = page.locator('span:has-text("Type Of Order")');
this.carryout = page.getByText('carryout', { exact: true });
this.delivery = page.getByText('delivery', { exact: true });
this.curbside = page.getByText('curbside', { exact: true });
this.storeFindText = page.getByText('Find a Lou Malnati\’s near you', { exact: true });
this.useCurrentLocation = page.getByText('Use your current location', { exact: true });
this.searchLocation = page.getByPlaceholder('Search Lou\’s locations');
this.storeOptions = page.locator('[data-testid="StoreOptions"]');
this.switchOrderType = page.getByText('Switch store or order type', { exact: true });
this.carryoutFrom = page.locator('h2:has-text("Carryout from:")');
this.store = page.locator('[data-testid="OrderStoreCard"]');
this.asapOption = page.locator('[value="ASAP"]');
this.scheduleOPtion = page.locator('[value="scheduled"]');
this.locationDropdown = page.locator('.shadow-xl');
this.locationDropdownLists = this.page.locator('.shadow-xl .py-2');

}

// Navigate to the application and continue as guest user
async navigateAsGuest(){
    await this.page.goto('/');
    await expect(this.guestLink).toBeVisible();
  await this.guestLink.click();
  await expect(this.page).toHaveTitle('Lou Malnati\'s Pizzeria - Order Online');
  await expect(this.orderType).toBeVisible();
  await expect(this.carryout).toBeVisible();
  await expect(this.delivery).toBeVisible();
  await expect(this.curbside).toBeVisible();
    await expect(this.useCurrentLocation).toBeVisible();
    await expect(this.searchLocation).toBeVisible();
  await this.carryout.click();
}


// Find store location based on input and return store details
    async findLocation(location: string, storename: string, locationlistitem: string){ 
    await this.searchLocation.fill(location);
    await this.locationDropdown.waitFor({ state: 'visible' });
    const dropdowncount: number = await this.locationDropdownLists.count();
    for (let i = 0; i < dropdowncount; i++) {
        const locationName: any = await this.locationDropdownLists.nth(i).textContent();
        console.log(`Location Name: ${locationName}`);
        //const locationNameText: string = locationName.replace(/,/g, ' ').toLowerCase();
        //console.log(`Location Name Text: ${locationNameText}`);
        if (locationName === locationlistitem)  {
            await this.locationDropdownLists.nth(i).click();
            break;
        }
         await expect(this.searchLocation).toHaveValue(locationlistitem);
            }
   
       await this.storeOptions.waitFor({'timeout': 10000, state: 'visible'});

        const availableText = await this.page.getByText(/\d+\s+Available/).innerText();
        const match = availableText.match(/(\d+)/);
        const availableCount = match ? parseInt(match[1], 10) : 0;
        const actualStoreCount = await this.store.count();
        expect(availableCount).toEqual(actualStoreCount);

        const count: number = await this.store.count();
        for (let i = 0; i < count; i++) {
            const storeName: string = await this.store.nth(i).locator('span').nth(0).innerText();
            if (storeName === storename) {
                const address: any = await this.store.nth(i).allInnerTexts();
                console.log(`Store Address Details: ${address}`);
                const useAddress: any = address.join(' ');
                return useAddress;
            }
        }
        return null;
    }  

    
  // Verify the number of store locations displayed matches expected count
    async verifyLocationCount(expectedcount: number) {
        const count: number = await this.store.count();
        expect(count).toEqual(expectedcount);
    }


// Navigate to switch store page and select order options
async gotoSwitchStorepage(storeName: string) {
    await this.store.locator(`span:has-text("${storeName}")`).first().click();
    await expect(this.switchOrderType).toBeVisible();
    await expect(this.carryoutFrom).toBeVisible();    
    await expect(this.asapOption).toBeVisible();
    await expect(this.scheduleOPtion).toBeVisible();
    await this.asapOption.click();
    await expect(this.asapOption).toBeChecked();
}
}



   
