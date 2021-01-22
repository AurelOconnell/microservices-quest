import express from 'express';
import cors from 'cors';
import skillRouter from './routes/skill';
import errorMiddleware from './middlewares/error';
import NotFoundError from './errors/NotFoundError';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(skillRouter);

app.get('*', () => {
  const error = new NotFoundError();
  throw error;
});

app.use(errorMiddleware);

export default app;
