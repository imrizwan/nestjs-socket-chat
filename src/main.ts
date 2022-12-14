import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RedisIoAdapter from './events/redis-io-adapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Uncomment these lines to use the Redis adapter:
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
