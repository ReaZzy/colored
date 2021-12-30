import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
