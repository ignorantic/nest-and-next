import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Post } from './posts.entity';
import { PostsService } from './posts.service';

@Crud({
  model: {
    type: Post,
  },
})
@Controller('api/posts')
export class PostsController {
  constructor(public service: PostsService) {}
}
