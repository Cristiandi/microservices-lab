import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    app: {
      port: parseInt(process.env.PORT, 10) || 8080,
      apiKey: process.env.API_KEY,
    },
    rabbitmq: {
      host: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
      user: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      queueName: process.env.RABBITMQ_QUEUE_NAME,
      url: process.env.RABBITMQ_URL,
    },
  };
});
