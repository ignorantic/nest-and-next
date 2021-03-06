import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { User } from './users.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      posts: {
        eager: true,
      },
    },
  },
})
@Controller('api/users')
export class UsersController {
  constructor(public service: UsersService) {}
}
