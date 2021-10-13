import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/users.schema';
import { IsUserExistMiddleware } from '../../middleware/usersMiddleware/isUserExist.middleware';
import { AuthService } from './auth.service';
import { IsUserDataValidMiddleware } from '../../middleware/usersMiddleware/isUserDataValid.middleware';
import { IsUserRegisteredMiddleware } from '../../middleware/usersMiddleware/isUserRegistered.middleware';
import { IsPasswordCorrectMiddleware } from '../../middleware/usersMiddleware/isPasswordCorrect.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(IsUserDataValidMiddleware)
      .forRoutes(AuthController)
      .apply(IsUserExistMiddleware)
      .forRoutes({ path: '/api/auth/register', method: RequestMethod.POST })
      .apply(IsUserRegisteredMiddleware, IsPasswordCorrectMiddleware)
      .forRoutes({ path: '/api/auth/login', method: RequestMethod.POST });
  }
}
