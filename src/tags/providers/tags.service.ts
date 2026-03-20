import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagsDto } from '../dtos/create-tags.dto';

@Injectable()
export class TagsService {
  constructor(
    // inject the tags repository here
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagsDtos: CreateTagsDto) {
    const tag = this.tagsRepository.create(createTagsDtos);
    return this.tagsRepository.save(tag);
  }
}
