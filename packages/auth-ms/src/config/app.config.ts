import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    app: {
      port: parseInt(process.env.PORT, 10) || 8080,
      apiKey: process.env.API_KEY,
    },
    notificationMS: {
      host: process.env.RABBITMQ_HOST,
      vhost: process.env.RABBITMQ_VHOST,
      user: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      queueName: process.env.RABBITMQ_QUEUE_NAME,
      url: process.env.RABBITMQ_URL,
    },
    database: {
      client: process.env.DATABASE_CLIENT,
      name: process.env.DATABASE_NAME,
    },
  };
});
