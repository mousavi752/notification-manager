import { Injectable } from '@nestjs/common';
import { SmsService } from '../../sms/services/sms.service';
import { QueueManagerService } from '../../queue-manager/services/queue-manager.service';
import { NotificationType } from '@prisma/db-notification';
import {
  TCreateEmailNotificationInput,
  TCreateSmsNotificationInput,
  TCreateSmsNotificationOutput,
} from '../notification.type';
import { Prisma } from '@prisma/db-notification';
import { EmailService } from '../../email/services/email.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly smsService: SmsService,
    private readonly emailService: EmailService,
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

  async createEmailNotification(
    args: TCreateEmailNotificationInput
  ): Promise<TCreateSmsNotificationOutput> {
    const notification = await this.emailService.create(args);
    this.queueManagerService.createTask({
      notificationId: notification.id,
      type: NotificationType.EMAIL,
    });
    return notification;
  }
}
