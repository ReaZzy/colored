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

@Entity('Posts')
export default class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column('varchar')
  @Length(3, 2500)
  content: string;

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user!: Users[];

  @ManyToMany(() => Users, (user) => user.login, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'likes',
  })
  likes!: Users[];

  @OneToMany(() => Comments, (comment) => comment.post, {
    onDelete: 'CASCADE',
  })
  comments: Comments[];

  @Column({ select: false })
  userId: string;
}
