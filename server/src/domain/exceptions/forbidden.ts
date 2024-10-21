import { BaseException } from './base';

export class ForbiddenException extends BaseException {
  constructor(message: string) {
    super(message, 403);
  }
}
