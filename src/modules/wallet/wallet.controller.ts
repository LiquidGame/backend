import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

import { JwtAuthGuard } from 'auth/jwt.guard';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly service: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: 'Authorization' })
  @Post('import')
  import(@Headers('Authorization') accessToken: string, @Body() data: any) {
    return this.service.import(accessToken, data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: 'Authorization' })
  @Get('wallet')
  wallet(@Headers('Authorization') accessToken: string) {
    return this.service.wallet(accessToken);
  }
}
