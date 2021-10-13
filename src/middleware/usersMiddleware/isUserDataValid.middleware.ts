import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { noData } from '../../constants/constants';

export class IsUserDataValidMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestException({ message: noData });
    }
    next();
  }
}
