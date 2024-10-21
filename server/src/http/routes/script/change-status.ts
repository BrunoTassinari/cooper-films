import { Router } from 'express';
import type { Request, Response } from 'express';
import z from 'zod';
import { changeScriptStatusUseCase } from '../../../useCases/script';
import { tryCatch } from '../../../lib/try-catch-handler';
import { jwtGuard } from '../../../auth/jwt-auth';

const schema = z.object({
  script_id: z.string(),
  user_id: z.string(),
  status: z.string(),
  observation: z.string().optional(),
});

const router = Router();

router.put(
  '',
  jwtGuard,
  tryCatch(async (req: Request, res: Response) => {
    const body = schema.parse(req.body);

    await changeScriptStatusUseCase.execute(body);

    res.status(204).json({});
  })
);

export { router as changeScripStatusRoute };
