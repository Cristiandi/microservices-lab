import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

import appConfig from '../../config/app.config';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @Inject('NOTIFICATION_CLIENT_PROXY')
    private notificationClientProxy: ClientProxy,
  ) {}

  async userCreated(input: any) {
    console.log('NotificationService.userCreated');
    const observable = this.notificationClientProxy.emit<number>(
      'user_created',
      input,
    );

    /*

    observable.subscribe({
      next: (data) => {
        console.log('NotificationService.userCreated.subscribe');
        console.log(data);
      },
      error: (err) => {
        console.log('NotificationService.userCreated.subscribe.error');
        console.log(err);
      },
      complete: () => {
        console.log('NotificationService.userCreated.subscribe.complete');
      },
    });

    */

    return observable;
  }

  userLogged(input: any) {
    console.log('NotificationService.userLogged');
    const observable = this.notificationClientProxy
      .send<any>('user_logged', input)
      .pipe(timeout(2000));

    // const result = await lastValueFrom(observable);

    // return lastValueFrom(observable);

    /*

    console.log('NotificationService.userLogged.result', result);

    observable.subscribe({
      next: (data) => {
        console.log('NotificationService.userLogged.subscribe.next');
        console.log(data);
      },
      error: (err) => {
        console.log('NotificationService.userLogged.subscribe.error');
        console.log(err);
      },
      complete: () => {
        console.log('NotificationService.userLogged.subscribe.complete');
      },
    });

    */

    return observable;
  }
}
