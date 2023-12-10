import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumberString, IsString } from 'class-validator';

export class SendSmsDto {
  @ApiProperty({ example: '09123456789' })
  @IsNumberString()
  receiver: string;

  @ApiProperty({ example: 'OTP' })
  @IsString()
  template: string;

  @ApiProperty({ example: ['token1', 'token2'] })
  @IsArray()
  messages: string[];
}
