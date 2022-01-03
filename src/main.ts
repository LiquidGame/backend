// Nestjs: https://docs.nestjs.com/

////
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('gunhunternft')
    .setDescription('Api services game gunhunterNFT')
    .setVersion('1.0')
    .addTag('gunhunterNFT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const cfgApp = app.get<ConfigService>(ConfigService);
  await app.listen(cfgApp.get('app.port'));

  console.info(`Listening on http://localhost:${cfgApp.get('app.port')}`);
}
bootstrap();
