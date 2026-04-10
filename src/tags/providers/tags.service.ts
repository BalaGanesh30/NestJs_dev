import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
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
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTagsByIds(tags: number[]) {
    let results = await this.tagsRepository.find({ where: { id: In(tags) } });
    return results;
  }

  public async deleteTag(id: number) {
    let tags = await this.tagsRepository.delete(id);

    return {
      message: `Tag with id ${id} has been deleted successfully`,
      delete: true,
      id,
      tags,
    };
  }

  public async softDeleteTag(id: number) {
    const tag = await this.tagsRepository.softDelete(id);
    if (!tag) {
      throw new Error(`Tag with id ${id} not found`);
    }
    return {
      message: `Tag with id ${id} has been soft deleted successfully`,
      tag,
    };
  }
}
