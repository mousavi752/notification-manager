import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { SmsTemplateType } from '@prisma/db-notification';

export class SmsTemplateDto {
  @ApiProperty({ example: 'test' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'test' })
  @IsString()
  key: string;

  @ApiProperty({ example: 'this is message template.' })
  @IsString()
  message: string;

  @ApiProperty({ enum: SmsTemplateType })
  @IsEnum(SmsTemplateType)
  type: SmsTemplateType;
}
