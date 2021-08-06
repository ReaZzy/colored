import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { hash } from 'bcryptjs';
import Posts from '../posts/posts.entity';

@Entity('Users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
