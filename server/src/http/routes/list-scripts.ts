import { Router } from 'express';
import type { Request, Response } from 'express';
import { tryCatch } from '../../lib/try-catch-handler';
import { listScriptUseCase } from '../../useCases';
import { jwtGuard } from '../../middlewares/jwt-auth';

const router = Router();

router.get(
  '/script/list',
  jwtGuard,
  tryCatch(async (req: Request, res: Response) => {
    const response = await listScriptUseCase.execute(req.user);

    res.status(200).json(response);
  })
);

export { router as listScriptsRoute };