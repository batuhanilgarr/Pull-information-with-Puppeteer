const puppeteer = require('puppeteer');

async function getAppReviews(appId) {
    // Set up Puppeteer
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    // Navigate to the app's page on the App Store
    await page.goto(`https://apps.apple.com/app/id${appId}`);

    // Wait for the reviews to load
    await page.waitForSelector('.we-customer-review h3');

    // Extract the reviews from the page
    const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll('.we-customer-review h3');
        return Array.from(reviewElements).map(element => element.innerText);
    });

    // Print the reviews to the screen
    reviews.forEach(review => {
        console.log(review);
    });

    // Close the browser
    await browser.close();
}

// Example usage:
getAppReviews('310633997');
