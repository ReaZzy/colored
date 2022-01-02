import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ credentials: true, origin: 'http://localhost:4200' });
  app.use(cookieParser());
  app.use(graphqlUploadExpress());

  await app.listen(process.env.PORT);
  Logger.log(`App is starting http://localhost:${process.env.PORT}`);
}
bootstrap();
