import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { CommonPost } from '../../common/interfaces';
import { User } from '../users/users.entity';

@Entity()
export class Post implements CommonPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  text: string;

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @Column({ default: true })
  isActive: boolean;
}
