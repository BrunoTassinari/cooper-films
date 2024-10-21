import { BaseException } from './base';

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, 404);
  }
}
