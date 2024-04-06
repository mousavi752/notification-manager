import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/services/database.service';
import {
  TSmsTemplateFindOrFailInput,
  TSmsTemplateFindOrFailOutput,
} from '../sms-template.type';
import { Prisma } from '@prisma/db-notification';

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

  async getAll() {
    return await this.db.smsTemplate.findMany();
  }

  async create(data: Prisma.SmsTemplateCreateInput) {
    return await this.db.smsTemplate.create({ data });
  }

  async update(
    data: Prisma.SmsTemplateUpdateInput,
    where: Prisma.SmsTemplateWhereUniqueInput
  ) {
    return await this.db.smsTemplate.update({ data, where });
  }
}
