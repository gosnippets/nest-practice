import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomLogger } from './custom-logger.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}
