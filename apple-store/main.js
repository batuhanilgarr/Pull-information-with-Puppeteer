const puppeteer = require('puppeteer');

async function searchAppStore(appName) {
    // Set up Puppeteer
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768});

    // Navigate to the App Store and search for the app
    await page.goto('https://apps.apple.com/');

    await page.click('#ac-gn-link-search')

    await page.type('input[class=ac-gn-searchform-input]', appName);
    await page.keyboard.press('Enter');

    // // Wait for the search results to load
    await page.waitForSelector('.rf-serp-curated-product');



    // Extract the app information from the page
    const appInfo = await page.evaluate(() => {
        const nameElement = document.querySelector('h2.rf-serp-productname');
        const developerElement = document.querySelector('.rf-serp-product-description p');
        return {
            name: nameElement ? nameElement.innerText : null,
            developer: developerElement ? developerElement.innerText : null
        };
    });

    // Print the app information to the screen
    console.log(`Name: ${appInfo.name}`);
    console.log(`Developer: ${appInfo.developer}`);

    // Navigate to the app's page on the App Store
    await page.click('.rf-serp-productoption-link a')

    // await page.click('.ember-view link .section__nav__see-all-link')

    // Wait for the reviews to load
    // await page.waitForSelector('.l-row');

    // Extract the reviews from the page
    const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll('div.we-customer-ratings__revisadas');
        return Array.from(reviewElements).map(element => element.innerText);
    });

// Print the reviews
// Print the reviews to the screen
    reviews.forEach(review => {
        console.log(review);
    });

// Close the browser
    await browser.close();
}

// Example usage:
searchAppStore('WhatsApp');
