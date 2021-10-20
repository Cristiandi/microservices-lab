import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { NotificationService } from '../notification/notification.service';

import { users } from './data/users';

@Injectable()
export class AuthService {
  private users;

  constructor(private readonly notificationService: NotificationService) {
    this.users = users;
  }

  public async register(input: any) {
    const { email, phoneNumber } = input;

    // check if user exists
    const user = this.users.find(
      (user) => user.email === email || user.phoneNumber === phoneNumber,
    );

    if (user) {
      throw new ConflictException('user already exists');
    }

    // add the new user to the list
    this.users = [
      ...this.users,
      {
        ...input,
        id: this.users.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // get the new user
    const newUser = this.users[this.users.length - 1];

    // emit the event
    await this.notificationService.userCreated(newUser);

    return {
      ...newUser,
      message: 'user registered successfully, event was emmited.',
    };
  }

  public async login(input: any) {
    const { email, password } = input;

    // find the user by email n password
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('email or password are wrong.');
    }

    // try to send the event message to notification service
    // n get the response
    try {
      const userLoggedObservable = this.notificationService.userLogged(user);

      const userLoggedResult = await lastValueFrom(userLoggedObservable);

      console.log('userLoggedResult', userLoggedResult);
    } catch (error) {
      console.log('error', error);
    }

    const clone = { ...user };

    delete clone.password;

    return {
      ...clone,
      message: 'user logged successfully, message was sent.',
    };
  }
}
