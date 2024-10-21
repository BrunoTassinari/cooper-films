import { BaseException } from '../domain/exceptions/base';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const errorHandler = (error: Error, req: any, res: any, next: any) => {
  if (error instanceof BaseException) {
    console.error(`[${req.method}] - ${req.url} :>> ${error.errorCode} - ${error.stack}`);

    return res.status(error.errorCode).json({
      code: error.errorCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    code: 500,
    message: error.message,
  });
};
