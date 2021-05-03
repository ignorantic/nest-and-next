import {
  Controller, Get, Param, Query, Render, UseInterceptors,
} from '@nestjs/common';
import { CrudRequestInterceptor } from '@nestjsx/crud';
import { UsersService } from '../../users/users.service';
import { UsersPaginationDto } from '../../users/dto/users.pagination.dto';

@Controller()
export class UsersHttpController {
  constructor(public usersService: UsersService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Render('users')
  @Get('users')
  public async postList(@Query() query: UsersPaginationDto): Promise<{ data, totalCount, page }> {
    const { data, totalCount } = await this.usersService.findAll({
      ...query,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });

    return { ...query, data, totalCount };
  }

  @Render('users/[id]')
  @Get('users/:id')
  public async post(@Param('id') id?: string): Promise<{ id, data }> {
    const data = await this.usersService.findOne(id);
    return { id, data };
  }
}
