import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { Users } from '../users/users.entity';

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

  @OneToMany(() => Users, (user) => user.login, {
    eager: true,
  })
  likes: Users[];
}
