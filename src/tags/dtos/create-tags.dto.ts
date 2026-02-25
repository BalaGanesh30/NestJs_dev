import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagsDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name!: string;

  @ApiProperty({
    description: 'Slug for the post URL',
    example: 'understanding-nestjs-decorators',
  })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiPropertyOptional({
    description: 'Description of the tag',
    example: 'This tag is used for posts related to NestJS decorators.',
  })
  @IsOptional()
  @IsString()
  description?: string;

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
}
