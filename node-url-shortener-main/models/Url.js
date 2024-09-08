import mongoose from 'mongoose';


const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  details:[{
  IP:{
     type:String,

  },
  country:
  {type:String, },
  coordinates:{type:[String]}}],

  
  expiresInDays: {type:Number, required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now } 
});

export default mongoose.model('Url', UrlSchema);
