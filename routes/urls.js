import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();


router.post('/short', async (req, res) => {
  const { origUrl } = req.body;

  const base = "https://www.google.com";

  const urlId = nanoid(7);
  
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.status(200).json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({message:err.message});
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

export default router;
