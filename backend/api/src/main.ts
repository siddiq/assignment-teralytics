import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with default settings
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,POST',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(3000);
}
bootstrap();
