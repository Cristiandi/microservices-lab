import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import appConfig from '../../config/app.config';

import { NotificationService } from './notification.service';

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [
    NotificationService,
    {
      provide: 'NOTIFICATION_CLIENT_PROXY',
      useFactory: (configService: ConfigService) => {
        // getting the microservice options
        const rabbitmqUser = configService.get<string>(
          'config.notificationMS.user',
        );
        const rabbitmqPassword = configService.get<string>(
          'config.notificationMS.password',
        );
        const rabbitmqHost = configService.get<string>(
          'config.notificationMS.host',
        );
        const rabbitmqVhost = configService.get<number>(
          'config.notificationMS.vhost',
        );
        const rabbiQueueName = configService.get<string>(
          'config.notificationMS.queueName',
        );

        const rabbitmqURL = configService.get<string>(
          'config.notificationMS.url',
        );

        const url =
          rabbitmqURL ||
          `amqp://${rabbitmqUser}:${rabbitmqPassword}@${rabbitmqHost}/${rabbitmqVhost}`;

        return ClientProxyFactory.create({
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
      },
      inject: [ConfigService],
    },
  ],
  controllers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
