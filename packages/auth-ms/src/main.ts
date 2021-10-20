import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);

  // getting the port from the config file
  const port = configService.get<number>('config.app.port');

  await app.listen(port, async () => {
    const url = await app.getUrl();

    Logger.log(`auth-ms is running on: ${url}`, 'main.ts');
  });
}
bootstrap();
