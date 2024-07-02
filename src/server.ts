import dotenv from 'dotenv';
import express, { Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoute from '@/routes/auth.route';
import todoRoute from '@/routes/todo.route';
import swaggerPlugin from '@/config/swagger';
import logger from '@/config/logger';

function initApp() {
  const configsCors = {
    origin: '*',
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  }
  dotenv.config();
  const PORT = process.env.PORT || 3000;
  const app = express();
  
  const url = `http://localhost:${PORT}`;
  app.use(bodyParser.json());
  app.use(cors(configsCors));
  app.use('/api', authRoute);
  app.use('/api', todoRoute);
  app.get('/', (_, res: Response) => {
    res.send('<h1>My Todo App</h1>');
  });
  swaggerPlugin(app);
  app.listen(PORT, () => {
    console.log(`App is running on ${url}`);
    console.log(`Swagger is running on ${url}/api-docs`);
    logger.info(url);
  });
}

initApp();