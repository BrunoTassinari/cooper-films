import { Router } from 'express';
import { changeScripStatusRoute } from './change-status';
import { createScriptRoute } from './create';
import { findByContactInfoRoute } from './find-by-contact-info';
import { findScriptByIdRoute } from './find-by-id';
import { listScriptsRoute } from './list';

const router = Router();

router.use(changeScripStatusRoute);
router.use(createScriptRoute);
router.use(findByContactInfoRoute);
router.use(listScriptsRoute);
router.use(findScriptByIdRoute);

router.use('/script', router);

export { router as scriptRoutes };
