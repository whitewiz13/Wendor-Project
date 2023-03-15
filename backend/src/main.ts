import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Inventory App')
    .setDescription('Inventory API description')
    .setVersion('1.0')
    .addTag('inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);
  app.enableCors();
  app.setGlobalPrefix('/api/v1', { exclude: ['/'] });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
