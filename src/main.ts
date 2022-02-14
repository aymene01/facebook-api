import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 4242;
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
  console.log(`server is running on port ${await app.getUrl()}`);
}
bootstrap();
