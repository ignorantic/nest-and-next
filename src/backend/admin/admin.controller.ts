import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AdminController {
	@Render('admin')
	@Get('admin')
	public admin() {
		return {};
	}
}
