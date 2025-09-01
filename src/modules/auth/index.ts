import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3000);
}

bootstrap()
  .then(() => {
    console.log('Auth module is running on http://localhost:3000');
  })
  .catch((err) => {
    console.error('Error starting Auth module:', err);
  });
