import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/application.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);

  await server.listen(3000);
}

bootstrap();
