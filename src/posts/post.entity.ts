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
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PostTypes } from './enums/postTypes.enum';
import { PostStatus } from './enums/postStatus.enum';
import { MetaOption } from '../meta-options/meta-options.entity';
import { User } from '../users/user.entity';
import { Tag } from '../tags/tags.entity';
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

  @ManyToMany(
    () => Tag,
    //  , (tag) => tag.posts, {
    //     cascade: true,
    //     eager: true,
    //   }\
    (tags) => tags.post,
  )
  @JoinTable()
  tags?: Tag[];

  // // 🔗 Relationship with meta options
  // @OneToMany(() => PostMetaOption, (metaOption) => metaOption.post, {
  //   cascade: true, // auto save meta options
  //   eager: false,
  // })
  // metaOptions?: PostMetaOption[];
  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true, // auto save meta options
    eager: true, // auto load meta options with post when we fetch posts
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
