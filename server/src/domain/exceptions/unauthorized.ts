import { BaseException } from './base';

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(message, 401);
  }
}
