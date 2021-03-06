import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  public async register(@Body() input: any) {
    return this.service.register(input);
  }

  @Post('login')
  public async login(@Body() input: any) {
    return this.service.login(input);
  }
}
