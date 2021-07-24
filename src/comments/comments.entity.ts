import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Posts from '../posts/posts.entity';
import { Users } from '../users/users.entity';
import { IsDefined, IsString, Length } from 'class-validator';

@Entity('Comments')
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Posts, (post) => post.id, {
    onDelete: 'CASCADE',
  })
  post!: Posts;

  @ManyToOne(() => Users, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user!: Users;

  @ManyToOne(() => Comments, (comment) => comment.id, {
    onDelete: 'CASCADE',
  })
  comments!: Comments;

  @OneToMany(() => Comments, (comment) => comment.comments, {
    onDelete: 'CASCADE',
  })
  replies: Comments[];

  @Column()
  userId: string;

  @Column()
  postId: string;

  @IsDefined()
  @IsString()
  @Length(10, 350)
  @Column('varchar')
  content: string;

  @Column({ nullable: true })
  commentsId: string;
}
