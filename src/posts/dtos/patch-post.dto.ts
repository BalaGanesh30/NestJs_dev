// import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'ID of the post to be patched',
    example: 101,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
