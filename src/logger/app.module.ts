import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { CustomLogger } from './custom-logger.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}
