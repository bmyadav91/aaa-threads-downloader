// const express = require('express');
// const puppeteer = require('puppeteer');
// const app = express();
// const port = 8000;

// app.use(express.static('public'));

// app.post('/getVideo2', async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     // Get the video URL from the request (you should validate and sanitize this URL)
//     const videoUrl = req.body.videoUrl;

//     await page.goto(videoUrl);
//     await page.waitForSelector('video');

//     const videoSrc = await page.evaluate(() => {
//       const video = document.querySelector('video');
//       return video ? video.src : null;
//     });

//     await browser.close();

//     if (videoSrc) {
//       res.json({ videoSrc });
//     } else {
//       res.json({ error: 'No video tag found on the page.' });
//     }
//   } catch (error) {
//     res.json({ error: 'An error occurred.' });
//   }
// });

// app.listen(port, () => {
//     console.log("reached here");
// })

console.log("working fetch video");