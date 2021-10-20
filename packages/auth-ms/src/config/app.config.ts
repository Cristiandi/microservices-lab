import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
      apiKey: process.env.API_KEY,
    },
    notificationMS: {
      rabbitmq: {
        host: process.env.NOTIFICATION_MS_RABBITMQ_HOST,
        vhost: process.env.NOTIFICATION_MS_RABBITMQ_VHOST,
        user: process.env.NOTIFICATION_MS_RABBITMQ_USER,
        password: process.env.NOTIFICATION_MS_RABBITMQ_PASSWORD,
        queueName: process.env.NOTIFICATION_MS_RABBITMQ_QUEUE_NAME,
        url: process.env.NOTIFICATION_MS_RABBITMQ_URL,
      },
    },
  };
});
