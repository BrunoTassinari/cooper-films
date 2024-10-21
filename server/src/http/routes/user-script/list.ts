import { Router } from 'express';
import type { Request, Response } from 'express';
import { tryCatch } from '../../../lib/try-catch-handler';
import { listUserScriptsUseCase } from '../../../useCases/user-script';
import { jwtGuard } from '../../../auth/jwt-auth';

const router = Router();

router.get(
  '/list/:user_id',
  jwtGuard,
  tryCatch(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const response = await listUserScriptsUseCase.execute(user_id);

    res.status(200).json(response);
  })
);

export { router as listUserScriptsRoute };
