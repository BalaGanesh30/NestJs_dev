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

    const post = this.postRepository.create({
      ...createPostDto,
      metaOptions: createPostDto.metaOptions || undefined,
    });

    return await this.postRepository.save(post);
  }

  public findAllPosts(userId: string): string {
    console.log(userId);
    const user = this.userService.getUserById({ id: parseInt(userId) });
    console.log(user);
    return 'this is posts service' + `${user}`;
  }
}
