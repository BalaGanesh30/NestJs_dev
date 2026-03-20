import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagsDto } from './dtos/create-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTag(@Body() createTagsDto: CreateTagsDto) {
    return this.tagsService.createTag(createTagsDto);
  }
}
