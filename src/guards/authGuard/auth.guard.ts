import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { unAuth } from '../../constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new BadRequestException({ message: unAuth });
    }
  }
}
