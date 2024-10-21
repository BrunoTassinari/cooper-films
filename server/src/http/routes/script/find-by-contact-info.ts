import { Router } from 'express';
import type { Request, Response } from 'express';
import { tryCatch } from '../../../lib/try-catch-handler';
import { findScriptByContactInfoUseCase } from '../../../useCases/script';

const router = Router();

router.get(
  '/by-contact-info',
  tryCatch(async (req: Request, res: Response) => {
    const { contact_name, contact_email, contact_phone } = req.query;

    const name = (contact_name as string) || '';
    const email = (contact_email as string) || '';
    const phone = (contact_phone as string) || '';

    const response = await findScriptByContactInfoUseCase.execute(name, email, phone);

    res.status(200).json(response);
  })
);

export { router as findByContactInfoRoute };
