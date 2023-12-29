import { Injectable } from '@nestjs/common';
import { NotificationInterface } from '../../notification/common/interfaces/notification.interface';
import { DatabaseService } from '../../database/services/database.service';
import {
  NotificationType,
  SmsStatus,
  SmsTemplateType,
} from '@prisma/db-notification';
import { TNotificationInterfaceCreateOutput } from '../../notification/notification.type';
import { SmsTemplateService } from '../../sms-template/services/sms-template.service';
import { SmsWithRelations, TSmsCreateInput } from '../sms.type';
import { TSmsTask } from '../../queue-manager/queue-manager.type';
import { ProviderService } from '../../provider/services/provider.service';
import { KavenegarAdaptor } from '../../provider/adaptors/kavenegar.adaptor';
import { ProviderKey, TSmsProviderOutput } from '../../provider/provider.type';

@Injectable()
export class SmsService implements NotificationInterface {
  constructor(
    private readonly db: DatabaseService,
    private readonly smsTemplateService: SmsTemplateService,
    private readonly providerService: ProviderService
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

  async send(args: TSmsTask) {
    let result: { response: TSmsProviderOutput; providerId: number };
    try {
      const sms: SmsWithRelations = await this.db.sms.findUnique({
        where: { id: args.smsId },
        include: { smsTemplate: true },
      });

      switch (sms.smsTemplate.type) {
        case SmsTemplateType.PATTERN:
          result = await this.sendPatternSms(sms);
          break;
        case SmsTemplateType.TEXTUAL:
          result = await this.sendTextualSms(sms);
          break;
        default:
          throw new Error('Sms template type is not implemented.');
      }

      await this.db.sms.update({
        where: { id: args.smsId },
        data: {
          status: SmsStatus.SENT,
          providerTrackingId: String(result.response.entries[0].messageid),
          providerId: result.providerId,
        },
      });

      console.log('sms is sent XD');
    } catch (err) {
      await this.db.sms.update({
        where: { id: args.smsId },
        data: {
          status: SmsStatus.NOT_SENT,
          providerTrackingId: String(result.response.entries[0].messageid),
          providerId: result.providerId,
        },
      });

      throw err;
    }
  }

  private async sendPatternSms(sms: SmsWithRelations) {
    const { adaptor, provider } = await this.selectProviderAdaptor();
    const response = await adaptor.sendPattern({
      receiver: sms.receiver,
      token: sms.messages[0],
      token2: sms.messages[1],
      token3: sms.messages[2],
      template: sms.smsTemplate.key,
    });
    console.log({ response });

    return { response, providerId: provider.id };
  }
  private async sendTextualSms(sms: SmsWithRelations) {
    const { adaptor, provider } = await this.selectProviderAdaptor();
    const message = sms.smsTemplate.message
      .replace('$1', sms.messages[0])
      .replace('$2', sms.messages[1])
      .replace('$3', sms.messages[2]);

    const response = await adaptor.sendTextual({
      receiver: sms.receiver,
      message: message,
    });
    console.log({ response });

    return { response, providerId: provider.id };
  }

  private async selectProviderAdaptor() {
    const provider = await this.providerService.selectSmsProvider();

    switch (provider.key) {
      case ProviderKey.KAVENEGAR:
        return {
          adaptor: new KavenegarAdaptor(
            provider.credentials['apiKey'],
            provider.credentials['sender']
          ),
          provider,
        };
        break;
      default:
        throw new Error(`Sms provider ${provider.key} is not implemented.`);
        break;
    }
  }
}
