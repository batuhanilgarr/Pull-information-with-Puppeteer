const https = require('https');
const cheerio = require('cheerio');

const puppeteer = require('puppeteer');



function searchApp(appName, callback) {
    // Google Play Store'da arama yapın
    https.get(`https://play.google.com/store/search?q=${encodeURIComponent(appName)}&c=apps`, (response) => {
        let html = '';
        response.on('data', (data) => {
            html += data;
        });
        response.on('end', () => {
            // Uygulamanın URL'sini bulun
            const $ = cheerio.load(html);
            const appUrl = $('.ftgkle a').first().attr('href');
            if (!appUrl) {
                return callback(new Error(`${appName} uygulaması bulunamadı`));
            }

            callback(null, appUrl);
        });
    }).on('error', (error) => {
        callback(error);
    });
}

// Örnek olarak "Facebook" uygulamasını bulun
searchApp('spotify', (error, appUrl) => {
    if (error) {
        console.error(error);
    } else {
        const link_url = "https://play.google.com" + appUrl
        console.log(link_url)
        async function searchAppStore() {
            // Set up Puppeteer
            const browser = await puppeteer.launch({headless:false});
            const page = await browser.newPage();

            // Navigate to the App Store and search for the app
            await page.goto(link_url);

            // Extract the app information from the page
            const appInfo = await page.evaluate(() => {
                const nameElement = document.querySelector('.Vbfug.auoIOc');
                const developerElement = document.querySelector('.g1rdde');
                return {
                    name: nameElement ? nameElement.innerText : null,
                    developer: developerElement ? developerElement.innerText : null
                };
            });

            // Print the app information to the screen
            console.log(`Name: ${appInfo.name}`);
            console.log(`Developer: ${appInfo.developer}`);

            // Close the browser
            await browser.close();
        }
        searchAppStore();
    }

});





