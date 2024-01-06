import { Notification, Email } from '@prisma/db-notification';
import { SmsWithRelations } from '../sms/sms.type';

export type NotificationWithRelations = Notification & {
  sms?: SmsWithRelations;
  email?: Email;
};

export type TNotificationInterfaceCreateOutput = Notification;

export type TCreateSmsNotificationInput = {
  receiver: string;
  messages: string[];
  template: string;
};

export type TCreateEmailNotificationInput = {
  receiver: string;
  sender: string;
  subject: string;
  message: string;
};

export type TCreateSmsNotificationOutput = Notification;
