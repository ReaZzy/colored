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

const passportInit = passport.initialize();

@Module({
  imports: [
    GraphQLModule.forRoot({
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
          onConnect: (_, webSocket) => {
            return new Promise((resolve) => {
              passportInit(webSocket.upgradeReq, {} as any, () => {
                resolve({ req: webSocket.upgradeReq });
              });
            });
          },
        },
      },
      context: ({ req }) => ({ ...req }),
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
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  }],
})
export class AppModule {}
