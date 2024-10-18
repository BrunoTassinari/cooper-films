import { Router } from 'express';
import type { Request, Response } from 'express';
import { tryCatch } from '../../lib/try-catch-handler';
import { findScriptByIdUseCase } from '../../useCases';
import { jwtGuard } from '../../middlewares/jwt-auth';

const router = Router();

router.get(
  '/script/:id',
  jwtGuard,
  tryCatch(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await findScriptByIdUseCase.execute(id);

    res.status(200).json(response);
  })
);

export { router as findScriptByIdRoute };
