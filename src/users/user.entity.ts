import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Index({ unique: true })
  @Column({
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    length: 255, // bcrypt hashes are ~60 chars, but keep safe
    nullable: false,
    select: false, // 👈 VERY IMPORTANT (password won’t be returned by default)
  })
  password: string;

  @OneToMany(
    () => Post,
    (post) => post.author, // Automatically save related posts when saving a user
  )
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
