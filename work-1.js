const https = require('https');
const cheerio = require('cheerio');

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
        console.log(appUrl);
    }
});
