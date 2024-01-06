import { NotificationType } from '@prisma/db-notification';
export enum QueueName {
  SMS = 'SMS_QUEUE',
  EMAIL = 'EMAIL_QUEUE',
}

export type TSmsTask = {
  receiver: string;
  messages: string[];
  templateId: number;
  smsId: number;
};

export type TEmailTask = {
  sender: string;
  receiver: string;
  subject: string;
  message: string;
  emailId: number;
};

export type TCreateTaskInput = {
  notificationId: number;
  type: NotificationType;
};
