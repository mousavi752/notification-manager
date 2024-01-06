import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: '7khat752@gmail.com' })
  @IsEmail()
  receiver: string;

  @ApiProperty({ example: 'mousavi752@gmail.com' })
  @IsString()
  sender: string;

  @ApiProperty({ example: 'testing email subject' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 'testing email message' })
  @IsString()
  message: string;
}
