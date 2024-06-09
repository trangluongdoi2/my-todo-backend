import dotenv from 'dotenv';
import express, { Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoute from '@/route/auth.route';
import logger from '@/config/logger';

const configsCors = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
}

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;
app.use(bodyParser.json());
app.use(cors(configsCors));
app.use('/api', authRoute);
app.use('', (req: Request, res: Response) => {
  res.status(200).send('Hello My Nodejs');
});
app.listen(PORT, () => {
  console.log(url);
  logger.info(url);
});

export {}