import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Materhub API')
    .setDescription('API Website - Materhub')
    .setContact('PW - Materhub', 'https://loxiasmegalos.github.io/Apresentacao/', 'murillo.alkantara@gmail.com')
    .setVersion('2.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
