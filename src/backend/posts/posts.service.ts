import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Post } from './posts.entity';
import { PostsPaginationDto } from './dto/posts.pagination.dto';
import { PostsPaginatedResultDto } from './dto/posts.pagination.result.dto';

@Injectable()
export class PostsService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) repo) {
    super(repo);
  }

  async getList(postPaginationDto: PostsPaginationDto): Promise<PostsPaginatedResultDto> {
    const skippedItems = (postPaginationDto.page - 1) * postPaginationDto.limit;

    const totalCount = await this.repo.count();
    const posts = await this.repo.createQueryBuilder('post')
      .offset(skippedItems)
      .limit(postPaginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: postPaginationDto.page,
      limit: postPaginationDto.limit,
      data: posts,
    };
  }

  async getOneEntity(id: string): Promise<Post> {
    return this.repo.createQueryBuilder('post')
      .where('post.id = :id', { id })
      .getOne();
  }
}
