import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { hash } from 'bcryptjs';
import Posts from '../posts/posts.entity';
import { CommentDataDto } from '../posts/dto/comment-data.dto';

@Entity('Users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column('varchar', { unique: true })
  @Length(3, 60)
  login: string;

  @Column('varchar', { select: false })
  password: string;

  @OneToMany(() => Posts, (post) => post.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  posts: Posts[];

  @ManyToMany(() => Posts, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'likes',
  })
  likes: Posts[];

  @ManyToMany(() => Posts, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'comments',
  })
  comments: CommentDataDto[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
