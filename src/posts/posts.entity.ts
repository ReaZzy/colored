import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Posts')
export default class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 150 })
  title: string;

  @Column('varchar', { length: 2500 })
  content: string;
}
