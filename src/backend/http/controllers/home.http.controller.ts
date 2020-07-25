import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeHttpController {
  @Render('index')
  @Get()
  public index() {
    return {};
  }
}
