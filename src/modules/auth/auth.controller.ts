import { Body, Controller, Post } from '@nestjs/common';

import { Account } from 'models/account.entity';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  signup(@Body() data: Account) {
    return this.service.signup(data);
  }

  @Post('signin')
  signin(@Body() data: Account) {
    return this.service.signin(data);
  }
}
