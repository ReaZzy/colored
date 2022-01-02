import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Posts from '../posts/posts.entity';
import { Users } from '../users/users.entity';
import { IsDefined, IsString, Length } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('Comments')
export class Comments extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdDate: Date;

  @Field(() => Posts)
  @ManyToOne(() => Posts, (post) => post.id, {
    onDelete: 'CASCADE',
  })
  post!: Posts;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user!: Users;

  @Field(() => Comments)
  @ManyToOne(() => Comments, (comment) => comment.id, {
    onDelete: 'CASCADE',
  })
  comments!: Comments;

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.comments, {
    onDelete: 'CASCADE',
  })
  replies: Comments[];

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String)
  @Column()
  postId: string;

  @Field(() => String)
  @IsDefined()
  @IsString()
  @Length(10, 350)
  @Column('varchar')
  content: string;

  @Field(() => String)
  @Column({ nullable: true })
  commentsId: string;
}
