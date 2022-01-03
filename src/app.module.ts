import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'configs/app.config';

import TypeORMConfig from 'database/typeorm';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

import { AuthModule } from './modules/auth/auth.module';
import { WalletModule } from 'modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      ignoreEnvFile: false,
    }),
    ConfigModule.forFeature(appConfig),
    TypeORMConfig,
    AuthModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
