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

  @Render('post')
  @Get('post')
  public postList() {
    return {};
  }

  @Render('post/[id]')
  @Get('post/:id')
  public post(@Param('id') id?: string) {
    return { id: Number(id) };
  }
}
