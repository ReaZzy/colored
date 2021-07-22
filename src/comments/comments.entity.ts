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

  @Column()
  userId: string;

  @Column()
  postId: string;

  @IsDefined()
  @IsString()
  @Length(10, 350)
  @Column('varchar')
  content: string;

  @OneToMany(() => Comments, (comment) => comment.id, {
    onDelete: 'CASCADE',
  })
  replies: Comments[];

  @ManyToOne(() => Comments, (comment) => comment.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  repliedTo: Comments;
}
