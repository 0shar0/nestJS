import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from '../../dto/updatePassword.dto';
import { AuthGuard } from '../../guards/authGuard/auth.guard';
import { ChangePasswordGuard } from '../../guards/authGuard/changePassword.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  get(@Req() req) {
    return this.userService.getMe(req.user.id);
  }
  @UseGuards(ChangePasswordGuard)
  @UseGuards(AuthGuard)
  @Patch('me')
  update(@Body() { newPassword }: UpdatePasswordDto, @Req() req) {
    return this.userService.updatePassword(newPassword, req.user.id);
  }
  @UseGuards(AuthGuard)
  @Delete('me')
  delete(@Req() req) {
    return this.userService.delete(req.user.id);
  }
}
