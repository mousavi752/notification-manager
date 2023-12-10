import { TNotificationInterfaceCreateOutput } from '../../notification.type';

export interface NotificationInterface {
  create(args): Promise<TNotificationInterfaceCreateOutput>;
}
