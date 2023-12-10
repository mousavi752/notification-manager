import { Injectable } from '@nestjs/common';
import { NotificationInterface } from '../../notification/common/interfaces/notification.interface';
import { DatabaseService } from '../../database/services/database.service';
import { NotificationType, SmsStatus } from '@prisma/db-notification';
import { TNotificationInterfaceCreateOutput } from '../../notification/notification.type';
import { SmsTemplateService } from '../../sms-template/services/sms-template.service';
import { TSmsCreateInput } from '../sms.type';

@Injectable()
export class SmsService implements NotificationInterface {
  constructor(
    private readonly db: DatabaseService,
    private readonly smsTemplateService: SmsTemplateService
  ) {}
  async create(
    args: TSmsCreateInput
  ): Promise<TNotificationInterfaceCreateOutput> {
    const smsTemplate = await this.smsTemplateService.findOrFail({
      where: { key: args.template },
    });
    const notification = await this.db.notification.create({
      data: {
        type: NotificationType.SMS,
        sms: {
          create: {
            receiver: args.receiver,
            status: SmsStatus.NOT_SENT,
            messages: args.messages,
            smsTemplate: {
              connect: {
                id: smsTemplate.id,
              },
            },
          },
        },
      },
    });

    return notification;
  }
}
