import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../../dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() { username, password }: UserDto) {
    return this.authService.register(username, password);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() { username }: UserDto) {
    return this.authService.login(username);
  }
}
