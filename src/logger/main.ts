import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingMiddleware } from './logging.middleware';
import { CustomLogger } from './custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(CustomLogger);
  app.useLogger(logger);

  app.use(new LoggingMiddleware(logger).use);

  await app.listen(3000);
}
bootstrap();
