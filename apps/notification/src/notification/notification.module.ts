import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { SmsModule } from '../sms/sms.module';
import { QueueManagerModule } from '../queue-manager/queue-manager.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [SmsModule, QueueManagerModule, EmailModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
