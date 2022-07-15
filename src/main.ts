import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from 'src/swagger/swagger.module';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.app = app;

  await app.listen(3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
