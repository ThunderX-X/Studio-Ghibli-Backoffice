import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Descarta un campo que no este en el dto
      forbidNonWhitelisted: true, // Alerta si hay un campo no definido en el dto
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('ADMIN STUDIO GHIBLI BACKOFFICE')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

// Dominio asignado: https://protected-castle-54488.herokuapp.com
