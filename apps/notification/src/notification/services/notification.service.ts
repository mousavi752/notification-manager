import { Injectable } from '@nestjs/common';
import { SmsService } from '../../sms/services/sms.service';
import { QueueManagerService } from '../../queue-manager/services/queue-manager.service';
import { NotificationType } from '@prisma/db-notification';
import {
  TCreateSmsNotificationInput,
  TCreateSmsNotificationOutput,
} from '../notification.type';

@Injectable()
export class NotificationService {
  constructor(
    private readonly smsService: SmsService,
    private readonly queueManagerService: QueueManagerService
  ) {}

  async createSmsNotification(
    args: TCreateSmsNotificationInput
  ): Promise<TCreateSmsNotificationOutput> {
    const notification = await this.smsService.create(args);
    this.queueManagerService.createTask({
      notificationId: notification.id,
      type: NotificationType.SMS,
    });
    return notification;
  }
}
