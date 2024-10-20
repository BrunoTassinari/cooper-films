import express from 'express';
import cors from 'cors';

import { loginRoute } from './routes/login';
import { scriptRoutes } from './routes/script';
import { scriptUserRoutes } from './routes/user-script';

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRoute);
app.use(scriptUserRoutes);
app.use(scriptRoutes);

export { app };
