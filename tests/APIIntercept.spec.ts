import {test, expect, request} from '@playwright/test';

test.describe('API Intercept Tests', () => {

    let authToken : string;

    test.beforeAll(async ({ request }) => {
   
       const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: {
                
            userEmail:"autotest25@gmail.com",
            userPassword:"Summer#25"

            }


            });
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
        authToken = responseBody.token;
        
        

      
    });




test('Intercet API response and validate data', async({page}) => {

 await page.addInitScript((value)=>{
    window.localStorage.setItem('token', value);
 }, authToken);
 

   

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route=>{

         const response = await page.request.fetch(route.request());
         const body = { data: [], message: "No Orders"};
         route.fulfill(
            {
                response,
                body: JSON.stringify(body)
            }
         );

        }
    );
    await page.goto('https://rahulshettyacademy.com/client');
      await page.locator('button:has-text("ORDERS")').click();
      await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');  
      expect(page.locator(".mt-4")).toContainText("You have No Orders to show at this time.");
 
    


});




test('Intercet API request and validate data', async ({page}) => {


await page.addInitScript((value)=>{
    window.localStorage.setItem('token', value);
 }, authToken );

 await page.goto('https://rahulshettyacademy.com/client');

 await page.locator('button:has-text("ORDERS")').click();

 await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',

    route => route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=693257dc32ed865871202712'})

    
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");



});


});





