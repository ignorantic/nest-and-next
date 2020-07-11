import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly usersService: PostsService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Post> {
    return this.usersService.findOne(id);
  }
}
