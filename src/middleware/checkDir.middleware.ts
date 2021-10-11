import { Request, Response, NextFunction } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { baseFolderURL } from '../constant/constant';

export const checkDirMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!existsSync(baseFolderURL)) {
    mkdirSync(baseFolderURL);
  }
  next();
};
