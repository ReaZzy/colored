import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Users } from '../users/users.entity';
import { Comments } from '../comments/comments.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('Posts')
export default class Posts {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdDate: Date;

  @Field(() => String)
  @Column('varchar')
  color: string;

  @Field(() => String)
  @Column('varchar')
  @Length(3, 2500)
  content: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user!: Users;

  @Field(() => [Users])
  @ManyToMany(() => Users, (user) => user.login, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'likes',
  })
  likes!: Users[];

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.post, {
    onDelete: 'CASCADE',
  })
  comments: Comments[];

  @Field(() => String)
  @Column({ select: false })
  userId: string;
}
