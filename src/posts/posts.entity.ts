import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Users } from '../users/users.entity';
import { Comments } from '../comments/comments.entity';

@Entity('Posts')
export default class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @Length(3, 150)
  title: string;

  @Column('varchar')
  @Length(3, 2500)
  content: string;

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user!: Users[];

  @ManyToMany(() => Users, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  likes!: Users[];

  @OneToMany(() => Comments, (comment) => comment.post, {
    onDelete: 'CASCADE',
    eager: true,
  })
  comments: Comments[];

  @Column()
  userId: string;
}
