import { Prisma, SmsTemplate } from '@prisma/db-notification';

export type TSmsTemplateFindOrFailInput = {
  where: Prisma.SmsTemplateWhereInput;
};
export type TSmsTemplateFindOrFailOutput = SmsTemplate;
