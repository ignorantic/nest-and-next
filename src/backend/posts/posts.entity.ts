import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonPost } from '../../common/interfaces';

@Entity()
export class Post implements CommonPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  text: string;

  @Column({ default: true })
  isActive: boolean;
}
