import { Injectable } from '@nestjs/common';
import {
  NotificationType,
  EmailStatus,
  Provider,
} from '@prisma/db-notification';
import { DatabaseService } from '../../database/services/database.service';
import { TCreateEmailNotificationInput } from '../../notification/notification.type';
import { ProviderService } from '../../provider/services/provider.service';
import { IEmailAdaptor, ProviderKey } from '../../provider/provider.type';
import { GmailAdaptor } from '../../provider/adaptors/gmail.adaptor';
import { TEmailTask } from '../../queue-manager/queue-manager.type';

@Injectable()
export class EmailService {
  constructor(
    private readonly db: DatabaseService,
    private readonly providerService: ProviderService
  ) {}

  async create(args: TCreateEmailNotificationInput) {
    return this.db.notification.create({
      data: {
        type: NotificationType.EMAIL,
        email: {
          create: args,
        },
      },
    });
  }

  async send(args: TEmailTask) {
    let adaptor: IEmailAdaptor, provider: Provider;
    try {
      const providerAdaptor = await this.selectProviderAdaptor();
      adaptor = providerAdaptor.adaptor;
      provider = providerAdaptor.provider;

      await adaptor.send(args);

      await this.db.email.update({
        where: { id: args.emailId },
        data: {
          status: EmailStatus.SENT,
          provider: {
            connect: { id: provider.id },
          },
        },
      });

      console.log('email is sent XD');
    } catch (err) {
      await this.db.email.update({
        where: { id: args.emailId },
        data: {
          status: EmailStatus.NOT_SENT,

          provider: provider?.id
            ? {
                connect: { id: provider.id },
              }
            : undefined,
        },
      });
      throw err;
    }
  }

  private async selectProviderAdaptor() {
    const provider = await this.providerService.selectEmailProvider();
    console.log(provider);

    switch (provider.key) {
      case ProviderKey.GMAIL:
        return {
          adaptor: new GmailAdaptor(
            provider.credentials['user'],
            provider.credentials['pass']
          ),
          provider,
        };
        break;
      default:
        throw new Error(`Email provider ${provider.key} is not implemented.`);
        break;
    }
  }
}
