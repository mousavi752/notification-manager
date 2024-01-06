import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueName } from './queue-manager.type';
import { DatabaseModule } from '../database/database.module';
import { QueueManagerService } from './services/queue-manager.service';
import { SmsModule } from '../sms/sms.module';
import { SmsProcessor } from './processores/sms.processor';
import { EmailProcessor } from './processores/email.processor';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: QueueName.SMS,
    }),
    BullModule.registerQueue({
      name: QueueName.EMAIL,
    }),
    DatabaseModule,
    SmsModule,
    EmailModule,
  ],
  providers: [QueueManagerService, SmsProcessor, EmailProcessor],
  exports: [QueueManagerService],
})
export class QueueManagerModule {}
