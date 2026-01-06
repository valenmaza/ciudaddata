import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const message = err?.message || 'Error del servidor interno';

  let status = 500;
  if (typeof err?.status === 'number') {
    status = err.status;
  } else if (/not\s*found/i.test(message)) {
    status = 404;
  } else if (err?.name === 'ValidationError' || /invalid|bad request|validation/i.test(message)) {
    status = 400;
  }

  res.status(status).json({ error: message });
};

export default errorHandler;