import { ProviderType } from '@prisma/db-notification';
import { IsEnum, IsString, IsBoolean, IsJSON, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ProviderDto {
  @ApiProperty({ enum: ProviderType })
  @IsEnum(ProviderType)
  type: ProviderType;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsObject()
  credentials: Object;
}
