import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import Posts from './posts.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users])],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
