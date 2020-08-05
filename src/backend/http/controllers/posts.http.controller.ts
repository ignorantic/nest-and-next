import {
  Controller, Get, Param, Query, Render, UseInterceptors,
} from '@nestjs/common';
import { CrudRequestInterceptor } from '@nestjsx/crud';
import { PostsService } from '../../posts/posts.service';
import { PostsPaginationDto } from '../../posts/dto/posts.pagination.dto';

@Controller()
export class PostsHttpController {
  constructor(public postsService: PostsService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Render('posts')
  @Get('posts')
  public async postList(@Query() query: PostsPaginationDto): Promise<{ data, totalCount, page }> {
    const { data, totalCount } = await this.postsService.getList({
      ...query,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });

    return { ...query, data, totalCount };
  }

  @Render('posts/[id]')
  @Get('posts/:id')
  public async post(@Param('id') id?: string): Promise<{ id, data }> {
    const data = await this.postsService.getOneEntity(id);
    return { id, data };
  }
}
