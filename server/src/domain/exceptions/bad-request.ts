import { BaseException } from './base';

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super(message, 400);
  }
}
