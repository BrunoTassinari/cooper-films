import { Router } from 'express';
import { createUserScriptRoute } from './create';
import { listUserScriptsRoute } from './list';

const router = Router();

router.use(createUserScriptRoute);
router.use(listUserScriptsRoute);

router.use('/script/user', router);

export { router as scriptUserRoutes };
