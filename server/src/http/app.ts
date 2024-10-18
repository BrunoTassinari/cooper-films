import express from 'express';
import cors from 'cors';

import { loginRoute } from './routes/login';
import { createScriptRoute } from './routes/create-script';
import { findScriptRoute } from './routes/find-script';

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRoute);
app.use(createScriptRoute);
app.use(findScriptRoute);

export { app };
