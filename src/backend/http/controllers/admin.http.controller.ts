import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AdminHttpController {
  @Render('admin')
  @Get('admin')
  public admin() {
    return {};
  }
}
