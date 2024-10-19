import jwt from 'jsonwebtoken';
import { Router } from 'express';
import z from 'zod';
import { findUserByCredentialsUseCase } from '../../useCases/user';
import { tryCatch } from '../../lib/try-catch-handler';

const router = Router();

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post(
  '/login',
  tryCatch(async (req, res) => {
    const { email, password } = LoginSchema.parse(req.body);

    const validUser = await findUserByCredentialsUseCase.execute(email, password);

    if (!validUser) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ validUser }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  })
);

export { router as loginRoute };
