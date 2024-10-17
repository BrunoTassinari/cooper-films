import { Router } from 'express';
import { createScriptRoute } from './create';
import { findScriptByIdRoute } from './find-script-status';

const app = Router();

app.use(createScriptRoute);
app.use(findScriptByIdRoute);

app.use('/script', app);

export { app as scriptRoutes };
