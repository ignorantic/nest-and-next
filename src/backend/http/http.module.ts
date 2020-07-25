import { Module } from '@nestjs/common';

import { PostsModule } from '../posts/posts.module';
import { HomeHttpController } from './controllers/home.http.controller';
import { AdminHttpController } from './controllers/admin.http.controller';
import { PostsHttpController } from './controllers/posts.http.controller';

@Module({
  imports: [
    PostsModule,
  ],
  controllers: [
    HomeHttpController,
    AdminHttpController,
    PostsHttpController,
  ],
})
export class HttpModule {}
