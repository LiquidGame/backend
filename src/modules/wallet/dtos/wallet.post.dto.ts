import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public_master_key: string;
}
