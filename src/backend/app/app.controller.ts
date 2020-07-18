import {
  Controller, Get, Param, Render,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Render('index')
  @Get()
  public index() {
    return {};
  }

  @Render('posts')
  @Get('posts')
  public postList() {
    return {};
  }

  @Render('posts/[id]')
  @Get('posts/:id')
  public post(@Param('id') id?: string) {
    return { id: Number(id) };
  }
}
