import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the config service
  const configService = app.get(ConfigService);

  // getting the microservice options
  const rabbitmqUser = configService.get<string>('config.rabbitmq.user');
  const rabbitmqPassword = configService.get<string>(
    'config.rabbitmq.password',
  );
  const rabbitmqHost = configService.get<string>('config.rabbitmq.host');
  const rabbitmqVhost = configService.get<number>('config.rabbitmq.vhost');
  const rabbiQueueName = configService.get<string>('config.rabbitmq.queueName');

  const rabbitmqURL = configService.get<string>('config.rabbitmq.url');

  const url =
    rabbitmqURL ||
    `amqp://${rabbitmqUser}:${rabbitmqPassword}@${rabbitmqHost}/${rabbitmqVhost}`;

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: rabbiQueueName,
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
