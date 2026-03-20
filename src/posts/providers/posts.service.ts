import { Body, Injectable } from '@nestjs/common';
import { UserService } from '../../users/providers/users.services';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-options.entity';

@Injectable()
export class PostsService {
  constructor(
    /** injecting the userService */
    private readonly userService: UserService,
    /**post inject */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    //meta options inject
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  //create posts for a user with meta options
  public async createPostForUser(@Body() createPostDto: CreatePostDto) {
    // const { metaOptions, ...postData } = createPostDto;

    // let metaOptionEntity = metaOptions
    //   ? this.metaOptionsRepository.create(metaOptions)
    //   : undefined;

    // if (metaOptionEntity) {
    //   await this.metaOptionsRepository.save(metaOptionEntity);
    // }

    // const post = this.postRepository.create(postData);

    // if (metaOptionEntity) {
    //   post.metaOptions = metaOptionEntity;
    // }

    // const post = this.postRepository.create(createPostDto);

    // return await this.postRepository.save(post);

    //find authenticated user
    const author = await this.userService.getUserById({
      id: createPostDto.authorId,
    });

    console.log(author, 'this is from the post service for author');

    const post = this.postRepository.create({
      ...createPostDto,
      metaOptions: createPostDto.metaOptions || undefined,
      author: author ? author : undefined, // Associate the post with the authenticated user
    });

    return await this.postRepository.save(post);
  }

  public async findAllPosts(userId: string) {
    console.log(userId);
    const user = this.userService.getUserById({ id: parseInt(userId) });
    let posts = await this.postRepository.find({
      relations: { metaOptions: true, author: true },
    });
    return posts;
  }

  public async deletePost(postId: number) {
    console.log(postId, 'this is from the post service for Id');
    //find the post by id
    // let post = await this.postRepository.findOneBy({ id: postId });
    // console.log(post, ' this is from the post services');
    // //deleting the post
    let data = await this.postRepository.delete({ id: postId });
    // //delete the metaoptions associated with the post
    // if (post && post.metaOptions) {
    //   await this.metaOptionsRepository.delete({ id: post.metaOptions.id });
    // }
    // //confirmation
    // let inverrsePost = await this.metaOptionsRepository.find({
    //   where: { id: post?.metaOptions?.id },
    //   relations: { post: true },
    // });

    return {
      message: `Post with id ${postId} and its associated meta options have been deleted successfully.`,
      data,
    };
    // return inverrsePost;
  }
}
