import { Sms, SmsTemplate } from '@prisma/db-notification';
import { NotificationWithRelations } from '../notification/notification.type';

export type SmsWithRelations = Sms & {
  notification?: NotificationWithRelations;
  smsTemplate?: SmsTemplate;
};
export type TSmsCreateInput = {
  template: string;
  receiver: string;
  messages: string[];
};
