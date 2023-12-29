import { Notification } from '@prisma/db-notification';
import { SmsWithRelations } from '../sms/sms.type';

export type NotificationWithRelations = Notification & {
  sms?: SmsWithRelations;
};

export type TNotificationInterfaceCreateOutput = Notification;

export type TCreateSmsNotificationInput = {
  receiver: string;
  messages: string[];
  template: string;
};
export type TCreateSmsNotificationOutput = Notification;
