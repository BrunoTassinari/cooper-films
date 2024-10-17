import express from 'express';
import cors from 'cors';
import { scriptRoutes } from './routes/script';

const app = express();

app.use(express.json());
app.use(cors());

app.use(scriptRoutes);

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

export { app };
