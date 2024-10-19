import express from 'express';
import cors from 'cors';

import { loginRoute } from './routes/login';
import { createScriptRoute } from './routes/create-script';
import { findScriptRoute } from './routes/find-script';
import { listScriptsRoute } from './routes/list-scripts';
import { findScriptByIdRoute } from './routes/find-script-by-id,';
import { createUserScriptRoute } from './routes/create-user-script';
import { listUserScriptsRoute } from './routes/list-user-scripts';

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRoute);
app.use(createScriptRoute);
app.use(createUserScriptRoute);
app.use(findScriptRoute);
app.use(listScriptsRoute);
app.use(findScriptByIdRoute);
app.use(listUserScriptsRoute);

export { app };
