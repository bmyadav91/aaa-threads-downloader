const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;

// Serve the home.html file as the default page
const static_path = path.join(__dirname);
app.use(express.static(static_path));

app.get("/", (req, res) => {
  // res.send("sending successfully");
});


app.use(express.json());
// download video 
app.post('/fetchvideo', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const threads_input_url = req.body.threads_input_url;
    await page.goto(threads_input_url);
    const videoElement = await page.waitForSelector('video');;
    if (videoElement) {
      const videoSrc = await page.evaluate(() => {
        const video = document.querySelector('video');
        return video ? video.src : null;
      }, videoElement);
      await browser.close();
      if (videoSrc !== null) {
        res.json({ videoSrc });
      } else {
        res.json({ error: 'No source found video.' });
      }
    } else {
      res.json({ error: 'There is no any Video.' });
    } 
  } catch (error) {
    res.json({ error: 'An error occurred. Please Check the Selection Video, Profile, or Post Photo. Still Error - Please Report at: team@aaaenos.com' });
  }
});

// download profile 
app.post('/fetchprofile', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const threads_input_url = req.body.threads_input_url;
    await page.goto(threads_input_url);
    const profileelement = await page.waitForSelector('.x1l90r2v img');
    if (profileelement) {
      const profilesrc = await page.evaluate(() => {
        const profileis = document.querySelector('.x1l90r2v img');
        return profileis ? profileis.src : null;
      }, profileelement);
      await browser.close();
      if (profilesrc !== null) {
        res.json({ profilesrc });
      } else {
        res.json({ error: 'No any Profile (.x1l90r2v) found.' });
      }
    } else {
      res.json({ error: 'There is no any Profile Img.' });
    } 
  } catch (error) {
    res.json({ error: 'An error occurred. Please Check the Selection Video, Profile, or Post Photo. Still Error - Please Report at: team@aaaenos.com' });
  }
});

// download post photo
app.post('/fetchpostphoto', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const threads_input_url = req.body.threads_input_url;
    await page.goto(threads_input_url);
    const postphotoel = await page.waitForSelector('picture.x87ps6o img');
    if (postphotoel) {
      const postphotosrc = await page.evaluate(() => {
        const postphotois = document.querySelector('picture.x87ps6o img');
        return postphotois ? postphotois.src : null;
      }, postphotoel);
      await browser.close();
      if (postphotosrc !== null) {
        res.json({ postphotosrc });
      } else {
        res.json({ error: 'No Post Photo Tag Found.' });
      }
    } else {
      res.json({ error: 'No Post Found Photo Src Found.' });
    } 
  } catch (error) {
    res.json({ error: 'An error occurred. Please Check the Selection Video, Profile, or Post Photo. Still Error - Please Report at: team@aaaenos.com' });
  }
});


// listing port 
app.listen(port, () => {
  console.log('Server is running');
});


