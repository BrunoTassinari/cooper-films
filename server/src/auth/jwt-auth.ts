import jwt, { type VerifyErrors } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../domain/exceptions/unauthorized';

const jwtGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedException('Token not found'));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error: VerifyErrors | null) => {
    if (error) return next(new UnauthorizedException('Invalid token'));

    next();
  });
};

export { jwtGuard };
