import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      }),
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

