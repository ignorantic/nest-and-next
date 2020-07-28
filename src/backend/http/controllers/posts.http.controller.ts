import {
  Controller, Get, Param, Query, Render, UseInterceptors,
} from '@nestjs/common';
import { CrudRequestInterceptor } from '@nestjsx/crud';
import { PostsService } from '../../posts/posts.service';
import { PostsPaginationDto } from '../../posts/dto/posts.pagination.dto';

@Controller()
export class PostsHttpController {
  constructor(public postService: PostsService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Render('posts')
  @Get('posts')
  public async postList(
    @Query() query: PostsPaginationDto,
  ): Promise<{ payload, page }> {
    const { data } = await this.postService.findAll({
      ...query,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
    });

    return { ...query, payload: data };
  }

  @Render('posts/[id]')
  @Get('posts/:id')
  public async post(@Param('id') id?: string) {
    const payload = await this.postService.findOne(id);
    return { id, payload };
  }
}
