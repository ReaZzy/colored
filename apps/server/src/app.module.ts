import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { ProfileModule } from './profile/profile.module';
import connectionOptions from './ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import * as passport from 'passport';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './middlewares/logging.interceptor';
import { UsersService } from './users/users.service';
import { getCookie } from '../utils/getCookie';
import * as jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

const passportInit = passport.initialize();
export const pubSub = new PubSub();

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [UsersModule],
      useFactory: async (usersService: UsersService) => ({
        debug: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        installSubscriptionHandlers: true,
        fieldResolverEnhancers: ['interceptors'],
        cors: {
          origin: 'http://localhost:4200',
          credentials: true,
        },
        subscriptions: {
          'subscriptions-transport-ws': {
            onConnect: async (_, webSocket) => {
              const token = getCookie(
                webSocket.upgradeReq.headers?.cookie,
                'auth'
              );
              const jwtPayload = jwt.decode(token);
              if (!jwtPayload) return;
              await usersService.setOnline(pubSub, jwtPayload, true);

              return new Promise((resolve) => {
                passportInit(webSocket.upgradeReq, {} as any, () => {
                  resolve({ req: webSocket.upgradeReq });
                });
              });
            },
            onDisconnect: async (webSocket) => {
              const token = getCookie(
                webSocket.upgradeReq.headers?.cookie,
                'auth'
              );
              const jwtPayload = jwt.decode(token);
              if (!jwtPayload) return;
              await usersService.setOnline(pubSub, jwtPayload, false);
            },
          },
        },
        context: ({ req }) => ({ req, pubSub }),
      }),
      inject: [UsersService],
    }),
    TypeOrmModule.forRoot(connectionOptions),
    ConfigModule.forRoot(),
    PostsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
