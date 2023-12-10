import { Injectable } from '@nestjs/common';
import { SmsService } from '../../sms/services/sms.service';
import {
  TCreateSmsNotificationInput,
  TCreateSmsNotificationOutput,
} from '../notification.type';

@Injectable()
export class NotificationService {
  constructor(private readonly smsService: SmsService) {}

  async createSmsNotification(
    args: TCreateSmsNotificationInput
  ): Promise<TCreateSmsNotificationOutput> {
    const notification = await this.smsService.create(args);
    return notification;
  }
}
