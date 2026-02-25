import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Nestjs - Blog Application')
    .setDescription('use the base url to access http://localhost:3000')
    .setLicense('MIT License', 'https://mit-license.org/')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  //Swagger setup
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //Port listening
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
