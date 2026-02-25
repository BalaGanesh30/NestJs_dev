import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
