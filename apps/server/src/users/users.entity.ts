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
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity('Users')
export class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdDate: Date;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column('varchar', { default: '' })
  avatar: string;

  @Field(() => String)
  @Column('varchar', { unique: true })
  @Length(3, 60)
  login: string;

  @Field(() => String)
  @Exclude()
  @Column('varchar', { select: false })
  password: string;

  @Field(() => [Posts])
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
      this.avatar = `users/profile-image/default/profile-default-${Math.ceil(
        Math.random() * 16
      )}.png`;
  }
}
