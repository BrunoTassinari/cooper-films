import { Router } from 'express';
import type { Request, Response } from 'express';
import z from 'zod';
import { createUserScriptUseCase } from '../../../useCases/user-script';
import { tryCatch } from '../../../lib/try-catch-handler';
import { jwtGuard } from '../../../auth/jwt-auth';

const schema = z.object({
  script_id: z.string(),
  user_id: z.string(),
});

const router = Router();

router.post(
  '',
  jwtGuard,
  tryCatch(async (req: Request, res: Response) => {
    const body = schema.parse(req.body);

    const response = await createUserScriptUseCase.execute(body);

    res.status(201).json(response);
  })
);

export { router as createUserScriptRoute };
