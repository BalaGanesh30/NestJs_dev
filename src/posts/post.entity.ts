import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PostTypes } from './enums/postTypes.enum';
import { PostStatus } from './enums/postStatus.enum';
import { MetaOption } from '../meta-options/meta-options.entity';
// import { PostMetaOption } from './post-meta-option.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 255,
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'enum',
    enum: PostTypes,
    nullable: false,
  })
  postType!: PostTypes;

  @Index({ unique: true })
  @Column({
    length: 255,
    nullable: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status!: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  schema?: Record<string, any>;

  @Column({
    length: 500,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  publishOn?: Date;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  tags?: string[];

  // // 🔗 Relationship with meta options
  // @OneToMany(() => PostMetaOption, (metaOption) => metaOption.post, {
  //   cascade: true, // auto save meta options
  //   eager: false,
  // })
  // metaOptions?: PostMetaOption[];
  @OneToOne(() => MetaOption, { cascade: true, eager: true })
  @JoinColumn()
  metaOptions?: MetaOption;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
