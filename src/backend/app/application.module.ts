import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';
import { AdminModule } from '../admin/admin.module';
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
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AdminModule,
  ],
  controllers: [AppController],
})

export class AppModule {}
