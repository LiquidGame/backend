import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { BIP32Interface, BIP32API } from 'bip32';
import * as bjs from 'bitcoinjs-lib';
import * as EthWallet from 'ethereumjs-wallet';

import { Wallet } from 'models/wallet.entity';
import { AuthService } from 'modules/auth/auth.service';

@Injectable()
export class WalletService {
  private bip32: BIP32API;
  private derivePath = 'm/0';
  constructor(
    @InjectRepository(Wallet)
    private repo: Repository<Wallet>,
    private authService: AuthService,
  ) {
    this.bip32 = BIP32Factory(ecc);
  }

  async import(accessToken: string, data: any) {
    try {
      const account: any = this.authService.decode(
        accessToken.replace('Bearer ', ''),
      );

      // Bitcoin
      const node: BIP32Interface = this.bip32.fromBase58(
        data.public_master_key,
      );
      const child: BIP32Interface = node.derivePath(this.derivePath);
      const { address: btcAddress } = bjs.payments.p2pkh({
        pubkey: child.publicKey,
      });

      // Ethereum
      const hdWallet = EthWallet.hdkey.fromExtendedKey(data.public_master_key);
      const ethNode = hdWallet.derivePath(this.derivePath);
      const ethWallet = ethNode.getWallet();
      const ethAddress = ethWallet.getAddressString();

      if (!btcAddress && !ethAddress) throw new BadRequestException();

      await this.repo.save([
        Wallet.create({
          account_id: account.id,
          currency_id: 1,
          address: btcAddress,
        }),
        Wallet.create({
          account_id: account.id,
          currency_id: 2,
          address: ethAddress,
        }),
      ]);

      return {
        btc_address: btcAddress,
        eth_address: ethAddress,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async wallet(accessToken: string) {
    try {
      const account: any = this.authService.decode(
        accessToken.replace('Bearer ', ''),
      );
      const wallets = await this.repo.find({ account_id: account.id });
      if (!wallets || !wallets.length) return null;

      const btcAddress = wallets.find((item) => item.currency_id === 1).address;
      const ethAddress = wallets.find((item) => item.currency_id === 2).address;

      return {
        btc_address: btcAddress,
        eth_address: ethAddress,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
