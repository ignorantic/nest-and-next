import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import { Post } from '../posts/posts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @Column({ default: true })
  isActive: boolean;
}
