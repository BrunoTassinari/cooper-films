import { BaseException } from './base';

export class ConflictException extends BaseException {
  constructor(message: string) {
    super(message, 409);
  }
}
