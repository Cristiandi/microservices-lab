import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @EventPattern('user_created')
  async userCreated(@Payload() input: any, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // console.log('user_created', input);
    // console.log('channel', channel);
    // console.log('originalMsg', originalMsg);
    // channel.ack(originalMsg);

    const result = await this.service.userCreated(input);

    // console.log('result', result);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    // console.log('channel', channel);

    channel.ack(originalMsg);

    return result;
  }

  @MessagePattern('user_logged')
  async userLogged(@Payload() input: any, @Ctx() context: RmqContext) {
    const result = await this.service.userLogged(input);

    // console.log('result', result);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    // console.log('channel', channel);

    channel.ack(originalMsg);

    return result;
  }
}
