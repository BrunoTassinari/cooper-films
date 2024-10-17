import { Router } from 'express';
import { createScriptRoute } from './create-script';

const app = Router();

app.use(createScriptRoute);

app.use('/script', app);

export { app as scriptRoutes };
