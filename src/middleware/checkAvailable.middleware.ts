import { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { baseFolderURL, clientError } from '../constant/constant';

export const checkAvailableMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { filename } = req.params;
  if (existsSync(resolve(baseFolderURL, filename || ''))) {
    next();
  } else {
    throw new BadRequestException({ message: clientError });
  }
};
