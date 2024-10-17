import express, { json } from 'express';
import logger from 'morgan';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import { router as usersRouter } from './routes/api/usersRouter.js';
import { router as entriesRouter } from './routes/api/entriesRouter.js';
import { router as productsRouter } from './routes/api/productsRouter.js';
import { router as calorieIntakeRouter } from './routes/api/calorieIntakeRouter.js';


const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use('/api/users', usersRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/calorieIntake', calorieIntakeRouter);




app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, _req, res) => {
  res.status(500).json({ message: err.message })
});

export default app;
