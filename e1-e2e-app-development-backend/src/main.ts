import { NestFactory } from '@nestjs/core';
import { AppModule } from './products.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Products service - e2e app development exercise')
    .setVersion('1.0')
    .addTag('products')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('store/products/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  console.log(process.env.PORT);

  await app.listen(8081); //usually in the env, but for the exercise it'll be publicized
}
bootstrap();
