import {
    nanoid
} from "nanoid";
import Url from "../models/Url.js";
import {
    validateUrl
} from "../utils/utils.js";

export const createShortUrl = async (req, res) => {

    const {
        origUrl,
        shortUrl,
        expiresInDays
    } = req.body;
    const urlId = nanoid(7);

    if (validateUrl(origUrl)) {
        try {
            let url = await Url.findOne({
                origUrl
            });
            if (url) {
                res.json(url);

            } else {
                shortUrl == '' ? `${req.protocol}://${req.get('host')}/${urlId}` : shortUrl;

                const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    expiresAt
                });

                await url.save();
                res.status(200).json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        }
    } else {
        res.status(400).json("Invalid Original Url");
    }
};

export const createOnClick= async (req, res) => {
    try {
      const url = await Url.findOne({ urlId: req.params.urlId });
  
      if (url) {
        if (url.expiresAt && new Date() > url.expiresAt) {
            return res.status(410).json('URL has expired');
          }
        const IP = req.headers['cf-connecting-ip'] ||  
                  req.headers['x-real-ip'] ||
                  req.headers['x-forwarded-for'] ||
                  req.socket.remoteAddress || '';
  
        const getAddress = () => {
          return new Promise((resolve, reject) => {
            satelize.satelize({ ip: IP }, (err, payload) => {
              if (err) {
                reject(err);
              } else {
                resolve(payload);
              }
            });
          });
        };
  
        try {
          const address = await getAddress();
          await Url.updateOne(
            { urlId: req.params.urlId },
            {
              $inc: { clicks: 1 },
              $push: {
                details: {
                  IP: IP,
                  country: address.country.en,
                  coordinates: [address.latitude, address.longitude]
                }
              }
            }
          );
        } catch (error) {
          console.error('Error fetching address:', error);
        }
  
        return res.redirect(url.origUrl);
      } else {
        
        return res.status(404).json('Not found');
      }
    } catch (err) {
      console.error('Server Error:', err);
      return res.status(500).json('Server Error');
    }
  }