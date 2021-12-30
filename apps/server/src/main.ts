import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ credentials: true, origin: 'http://localhost:4200' });
  app.use(cookieParser());
  app.use(graphqlUploadExpress());
  app.use(passport.initialize());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });

  await app.listen(process.env.PORT);
}
bootstrap().then(() => {
  console.log(`App is starting http://localhost:${process.env.PORT}`);
});
