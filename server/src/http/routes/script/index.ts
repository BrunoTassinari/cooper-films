import { Router } from 'express';
import { createScriptRoute } from './create';
import { findScriptRoute } from './find';

const app = Router();

app.use(createScriptRoute);
app.use(findScriptRoute);

app.use('/script', app);

export { app as scriptRoutes };
