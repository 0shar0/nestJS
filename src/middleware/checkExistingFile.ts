import { Request, Response, NextFunction } from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { baseFolderURL, clientError } from '../constant/constant';
import { BadRequestException } from '@nestjs/common';
export const checkExistingFile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { filename } = req.body;
  if (!existsSync(resolve(baseFolderURL, filename))) {
    next();
  } else {
    throw new BadRequestException({ message: clientError });
  }
};
