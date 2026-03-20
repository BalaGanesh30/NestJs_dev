import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostTypes } from '../enums/postTypes.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-metaOptions.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Understanding NestJS Decorators',
  })
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Type of the post',
    example: PostTypes.POST,
    enum: PostTypes,
  })
  @IsEnum(PostTypes)
  postType!: PostTypes;

  @ApiProperty({
    description: 'Slug for the post URL',
    example: 'understanding-nestjs-decorators',
  })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiProperty({
    description: 'Status of the post',
    example: PostStatus.DRAFT,
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  status!: PostStatus;

  @ApiPropertyOptional({
    description: 'Content of the post.',
    example: 'This is a sample post content.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Additional schema data in JSON format',
    example: { '@context': 'https://schema.org', '@type': 'Article' },
  })
  @IsOptional()
  schema?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'URL of the featured image',
    example: 'https://example.com/featured-image.jpg',
  })
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Scheduled publish date in ISO 8601 format',
    example: '2023-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsISO8601()
  publishOn?: string;

  @ApiPropertyOptional({
    description: 'Tags associated with the post ids',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    description: 'Meta options for the post',
    type: Object,
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          example: '{"sideBarEnabled": true}',
          description: 'Meta value is the json string',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'ID of the author creating the post',
    example: 1,
  })
  authorId: number;
}
