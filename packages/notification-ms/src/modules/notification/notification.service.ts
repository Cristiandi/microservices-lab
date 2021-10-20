import { Injectable, Logger } from '@nestjs/common';

import { notifications } from './data/notifications';

@Injectable()
export class NotificationService {
  private notifications;

  constructor() {
    this.notifications = notifications;
  }

  public async userCreated(input: any): Promise<any> {
    const { email } = input;

    // add the new notification to the list
    this.notifications = [
      ...this.notifications,
      {
        id: this.notifications.length + 1,
        type: 'userCreated',
        email,
      },
    ];

    Logger.log(`userCreated | notifying ${email}...`, NotificationService.name);

    console.log('notifications', this.notifications);

    return {
      ...this.notifications[this.notifications.length - 1],
    };
  }

  public async userLogged(input: any): Promise<any> {
    const { email } = input;

    // add the new notification to the list
    this.notifications = [
      ...this.notifications,
      {
        id: this.notifications.length + 1,
        type: 'userLogged',
        email,
      },
    ];

    Logger.log(`userLogged | notifying ${email}...`, NotificationService.name);

    console.log('notifications', this.notifications);

    return {
      ...this.notifications[this.notifications.length - 1],
    };
  }
}
