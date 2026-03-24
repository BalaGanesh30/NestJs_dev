import {
  Body,
  Controller,
  Delete,
  Injectable,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagsDto } from './dtos/create-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTag(@Body() createTagsDto: CreateTagsDto) {
    return this.tagsService.createTag(createTagsDto);
  }

  @Delete('/delete')
  public async deleteTag(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
