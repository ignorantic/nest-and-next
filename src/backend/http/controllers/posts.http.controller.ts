import {
  Controller,
  Get,
  Param,
  Render,
} from '@nestjs/common';
import { PostsService } from '../../posts/posts.service';

@Controller()
export class PostsHttpController {
  constructor(public postService: PostsService) {}

  @Render('posts')
  @Get('posts')
  public async postList() {
    const payload = await this.postService.find();
    return { payload };
  }

  @Render('posts/[id]')
  @Get('posts/:id')
  public async post(@Param('id') id?: string) {
    const payload = await this.postService.findOne(id);
    return { id, payload };
  }
}
