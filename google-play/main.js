const puppeteer = require('puppeteer');

async function getAppReviews(appId) {
    // Set up Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the app's page on Google Play
    await page.goto(`https://play.google.com/store/apps/details?id=${appId}`);

    // Wait for the reviews to load
    await page.waitForSelector('.h3YV2d');

    // Extract the reviews from the page
    const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll('.h3YV2d');
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
getAppReviews('com.whatsapp');
