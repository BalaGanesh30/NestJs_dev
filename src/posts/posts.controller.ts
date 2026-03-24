import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    /*injecting the dependency of post services*/
    private readonly postsService: PostsService,
  ) {}
  @Get(`{/:userId}`)
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAllPosts(userId);
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: CreatePostDto,
  })

  //create post endpoint with meta options
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto, ' this is from post controller ');
    return this.postsService.createPostForUser(createPostDto);
  }

  @ApiOperation({ summary: 'Update an existing post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: PatchPostDto,
  })
  @Patch()
  public updatePost(@Body() updatePostDto: PatchPostDto) {
    console.log(updatePostDto);
    return this.postsService.updatePost(updatePostDto);
  }

  @Delete('/delete')
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    console.log(id, 'this is frpm ctrl posts');
    return this.postsService.deletePost(id);
  }
}
