import { Module } from '@nestjs/common';

import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import { HomeHttpController } from './controllers/home.http.controller';
import { AdminHttpController } from './controllers/admin.http.controller';
import { PostsHttpController } from './controllers/posts.http.controller';
import { UsersHttpController } from './controllers/users.http.controller';

@Module({
  imports: [
    PostsModule,
    UsersModule,
  ],
  controllers: [
    HomeHttpController,
    AdminHttpController,
    PostsHttpController,
    UsersHttpController,
  ],
})
export class HttpModule {}
