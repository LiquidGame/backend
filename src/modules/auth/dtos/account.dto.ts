import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AccountDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @ApiProperty()
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
