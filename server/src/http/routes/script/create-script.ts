import { Router } from 'express';
import type { Request, Response } from 'express';
import z from 'zod';
import { useCase } from '../../../useCases/script/createScript';

const CreateScriptSchema = z.object({
  content: z.string(),
  contact_name: z.string(),
  contact_email: z.string(),
  contact_phone: z.string(),
});

const app = Router();

app.post('', async (req: Request, res: Response) => {
  try {
    const { content, contact_name, contact_email, contact_phone } =
      CreateScriptSchema.parse(req.body);

    const response = await useCase.execute({
      content,
      contact_name,
      contact_email,
      contact_phone,
    });

    res.status(201).json(response);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export { app as createScriptRoute };
