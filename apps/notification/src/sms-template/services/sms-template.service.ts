import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/services/database.service';
import {
  TSmsTemplateFindOrFailInput,
  TSmsTemplateFindOrFailOutput,
} from '../sms-template.type';

@Injectable()
export class SmsTemplateService {
  constructor(private readonly db: DatabaseService) {}

  async findOrFail(
    args: TSmsTemplateFindOrFailInput
  ): Promise<TSmsTemplateFindOrFailOutput> {
    const smsTemplate = await this.db.smsTemplate.findFirst(args);
    if (!smsTemplate)
      throw new BadRequestException('الگوی پیامک مورد نظر یافت نشد.');

    return smsTemplate;
  }
}
