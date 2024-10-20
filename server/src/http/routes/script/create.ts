import { Router } from 'express';
import type { Request, Response } from 'express';
import z from 'zod';
import { createScriptUseCase } from '../../../useCases/script';
import { tryCatch } from '../../../lib/try-catch-handler';

const CreateScriptSchema = z.object({
  title: z.string(),
  content: z.string(),
  contact_name: z.string(),
  contact_email: z.string(),
  contact_phone: z.string(),
});

const router = Router();

router.post(
  '',
  tryCatch(async (req: Request, res: Response) => {
    const body = CreateScriptSchema.parse(req.body);

    const response = await createScriptUseCase.execute(body);

    res.status(201).json(response);
  })
);

export { router as createScriptRoute };
