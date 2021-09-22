import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
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

  @Column('varchar', { default: '' })
  avatar: string;

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
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setAvatar() {
    if (!this.avatar)
      this.avatar = `users/profile-image/profile-default-${Math.ceil(
        Math.random() * 16,
      )}.png`;
  }
}
