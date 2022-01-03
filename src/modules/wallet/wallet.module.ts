import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from 'models/wallet.entity';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), AuthModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
