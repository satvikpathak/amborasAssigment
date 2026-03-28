import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-store-id'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};
