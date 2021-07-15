import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

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

  @Column('int', { default: 0 })
  likes: 0;
}
