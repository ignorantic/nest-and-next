import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { User } from './users.entity';
import { UsersPaginatedResultDto } from './dto/users.pagination.result.dto';
import { UsersPaginationDto } from './dto/users.pagination.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async findAll(postPaginationDto: UsersPaginationDto): Promise<UsersPaginatedResultDto> {
    const skippedItems = (postPaginationDto.page - 1) * postPaginationDto.limit;

    const totalCount = await this.repo.count();
    const users = await this.repo.createQueryBuilder('user')
      .offset(skippedItems)
      .limit(postPaginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: postPaginationDto.page,
      limit: postPaginationDto.limit,
      data: users,
    };
  }
}
