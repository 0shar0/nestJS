import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    NotesModule,
    AuthModule,
    MorganModule,
    RouterModule.register([
      {
        path: '/api',
        module: UsersModule,
      },
      {
        path: '/api',
        module: NotesModule,
      },
      {
        path: '/api',
        module: AuthModule,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
