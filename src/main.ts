import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT);
  console.log(`App is starting http://localhost:${process.env.PORT}`);
}
bootstrap();
