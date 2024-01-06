import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/db-notification';
import { DatabaseService } from '../../database/services/database.service';
import { NotificationWithRelations } from '../../notification/notification.type';
import { InjectQueue } from '@nestjs/bullmq';
import {
  QueueName,
  TSmsTask,
  TCreateTaskInput,
  TEmailTask,
} from '../queue-manager.type';
import { Queue } from 'bullmq';

@Injectable()
export class QueueManagerService {
  constructor(
    private readonly db: DatabaseService,
    @InjectQueue(QueueName.SMS) private readonly smsQueue: Queue,
    @InjectQueue(QueueName.EMAIL) private readonly emailQueue: Queue
  ) {}

  async createTask(args: TCreateTaskInput) {
    const notification: NotificationWithRelations =
      await this.db.notification.findUnique({
        where: { id: args.notificationId },
        include: {
          sms: true,
          email: true,
        },
      });
    switch (args.type) {
      case NotificationType.SMS:
        await this.createSmsTask({
          receiver: notification.sms.receiver,
          messages: notification.sms.messages,
          smsId: notification.sms.id,
          templateId: notification.sms.smsTemplateId,
        });
        break;
      case NotificationType.EMAIL:
        await this.createEmailTask({
          sender: notification.email.sender,
          receiver: notification.email.receiver,
          subject: notification.email.subject,
          message: notification.email.message,
          emailId: notification.email.id,
        });
        break;
      default:
        throw new Error(`Type ${args.type} is not implemented.`);
    }
  }

  private createSmsTask(args: TSmsTask) {
    this.smsQueue.add('sms', args);
  }
  private createEmailTask(args: TEmailTask) {
    console.log('task created.', args);
    this.emailQueue.add('email', args);
  }
}
