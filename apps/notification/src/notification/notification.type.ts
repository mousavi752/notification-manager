import { Notification } from '@prisma/db-notification';

export type TNotificationInterfaceCreateOutput = Notification;

export type TCreateSmsNotificationInput = {
  receiver: string;
  messages: string[];
  template: string;
};
export type TCreateSmsNotificationOutput = Notification;
