import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);

  await server.listen(3000);
}

bootstrap();
