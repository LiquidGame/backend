import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Account } from 'models/account.entity';
import { AccountDTO } from './dtos/account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private repo: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  //Create account
  findOne(criterias: any) {
    return this.repo.findOne({ where: criterias });
  }

  async signup(payload: AccountDTO) {
    try {
      const username = payload?.username?.toLowerCase();
      const password = await bcrypt.hash(payload?.password, 10);

      let account: Account = await this.repo.findOne({ username });
      if (account) throw new UnauthorizedException();
      account = await this.repo.save(Account.create({ username, password }));

      return {
        ...account.toJSON(),
        access_token: this.jwtService.sign({
          username,
          id: account.id,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signin(payload: AccountDTO) {
    try {
      const username = payload?.username?.toLowerCase();

      const account: Account = await this.repo.findOne({ username });
      if (!account) throw new UnauthorizedException();

      const isCompared = await bcrypt.compare(
        payload.password,
        account.password,
      );
      if (!isCompared) throw new UnauthorizedException();

      return {
        ...account.toJSON(),
        access_token: this.jwtService.sign({
          username,
          id: account.id,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  decode(auth: string) {
    return this.jwtService.decode(auth);
  }
}
