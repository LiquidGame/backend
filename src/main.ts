// Nestjs: https://docs.nestjs.com/

////
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('HDWallet')
    .setDescription('Api services HDWallet')
    .setVersion('1.0')
    .addTag('HDWallet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const cfgApp = app.get<ConfigService>(ConfigService);
  await app.listen(cfgApp.get('app.port'));

  console.info(`Listening on http://localhost:${cfgApp.get('app.port')}`);
}
bootstrap();
