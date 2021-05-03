import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Next from 'next';
import { RenderModule } from 'nest-next';

import { HttpModule } from '../http/http.module';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      }),
      {
        viewsDir: '',
      },
    ),
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
    HttpModule,
  ],
})

export class AppModule {}
