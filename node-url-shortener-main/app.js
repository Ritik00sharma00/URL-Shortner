import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import router from './routes/index.js';
dotenv.config({ path: './config/.env' });

const app = express();

connectDB();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/', router);

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
