import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { SendSmsDto } from '../dto/send-sms.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
@Controller('notification')
@ApiTags('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiResponse({
    status: 201,
    description: 'Return the notification.',
  })
  @Post('sms')
  async sendSms(@Body() body: SendSmsDto) {
    const notification = await this.notificationService.createSmsNotification(
      body
    );

    return notification;
  }

  @ApiResponse({
    status: 201,
    description: 'Return the notification.',
  })
  @Post('email')
  async sendEmail(@Body() body: SendEmailDto) {
    const notification = await this.notificationService.createEmailNotification(
      body
    );

    return notification;
  }
}
