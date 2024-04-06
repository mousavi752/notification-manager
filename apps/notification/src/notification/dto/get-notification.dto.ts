import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { NotificationType } from '@prisma/db-notification';

export class GetNotificationDto {
  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;
}
