import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { checkDirMiddleware } from './middleware/checkDir.middleware';
import { checkAvailableMiddleware } from './middleware/checkAvailable.middleware';
import { checkExistingFile } from './middleware/checkExistingFile';

@Module({
  imports: [ConfigModule.forRoot(), MorganModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(checkDirMiddleware, checkExistingFile)
      .forRoutes({ path: 'api/files', method: RequestMethod.POST })
      .apply(checkAvailableMiddleware)
      .exclude({ path: 'api/files', method: RequestMethod.POST })
      .forRoutes(AppController);
  }
}
