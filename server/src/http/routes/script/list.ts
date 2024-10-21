import { Router } from 'express';
import type { Request, Response } from 'express';
import { tryCatch } from '../../../lib/try-catch-handler';
import { listScriptUseCase } from '../../../useCases/script';
import { jwtGuard } from '../../../auth/jwt-auth';

const router = Router();

router.get(
  '/list',
  jwtGuard,
  tryCatch(async (req: Request, res: Response) => {
    const response = await listScriptUseCase.execute();

    res.status(200).json(response);
  })
);

export { router as listScriptsRoute };
