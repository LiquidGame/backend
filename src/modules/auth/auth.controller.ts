import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AccountDTO } from './dtos/account.dto';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  signup(@Body() data: AccountDTO) {
    return this.service.signup(data);
  }

  @Post('signin')
  signin(@Body() data: AccountDTO) {
    return this.service.signin(data);
  }
}
