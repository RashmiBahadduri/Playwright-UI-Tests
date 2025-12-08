import {test, expect} from '@playwright/test';

test.describe('Automate Date Picker Tests', () => {

    test('Select a specific date from date picker', async ({page}) => {

        await page.goto('https://demoqa.com/date-picker');
        await page.locator("#datePickerMonthYearInput").click();
        await page.getByText('24', { exact: true }).click();
        const dateValue = await page.locator("#datePickerMonthYearInput").inputValue();
        console.log(`Selected date is: ${dateValue}`);
        expect(dateValue).toContain("24");
    });




    test('Select current date from date picker', async ({page}) => {

        await page.goto('https://demoqa.com/date-picker');

        const today=new Date();
        const currentDate=today.getDate();
        await page.locator("#datePickerMonthYearInput").click();
        await page.getByText(`${currentDate}`, { exact: true }).first().click();
        const dateValue = await page.locator("#datePickerMonthYearInput").inputValue();
        console.log(`Selected date is: ${dateValue}`);
        expect(dateValue).toContain(currentDate.toString());



    });

    test('Select date, month and year from date and time picker', async ({page}) => {

        const targetMonth = "May";
        const targetYear : number = 2026;
        const targetDate = 15;

        await page.goto('https://demoqa.com/date-picker');
        await page.locator("#datePickerMonthYearInput").click();

        while(true){
            const displayedYearMonth = await page.locator(".react-datepicker__current-month").textContent() || "0";
            const displayedYear = parseInt(displayedYearMonth.trim().split(" ")[1]);
            console.log(`Displayed Year: ${displayedYear}`);

            if(displayedYear === targetYear){ 
                break;
            }  
            if(displayedYear < targetYear){
                await page.locator(".react-datepicker__navigation--next").click();
            } else {
                await page.locator(".react-datepicker__navigation--previous").click();
            }   


        }

        while(true){
            const displayedYearMonth = await page.locator(".react-datepicker__current-month").textContent() || "0";
            const displayedMonth = displayedYearMonth.trim().split(" ")[0];

            if(displayedMonth === targetMonth){ 
                break;
            }
            await page.locator(".react-datepicker__navigation--next").click();
        }
        await page.getByText(`${targetDate}`, { exact: true }).first().click();
        
    
    });


    test('Select date, month and year from calendar dropdown', async ({page}) => {

        const targetMonth = "August"
        const targetYear = "2026";
        const targetDate = "20";
        const expectedDate = '08/20/2026';

        await page.goto('https://demoqa.com/date-picker');
         await page.locator("#datePickerMonthYearInput").click();
         //await page.locator('.react-datepicker__month-select').click();
         await page.locator('.react-datepicker__month-select').selectOption(targetMonth);
        await page.locator('.react-datepicker__year-select').selectOption(targetYear);
         await page.getByText(targetDate, { exact: true }).click();
         expect(await page.locator("#datePickerMonthYearInput").inputValue()).toBe(expectedDate);
         
    });



});