import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const jwtGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded.validUser;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export { jwtGuard };
