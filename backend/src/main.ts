import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api/v1', { exclude: ['/'] });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
