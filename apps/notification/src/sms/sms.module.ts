import { Module } from '@nestjs/common';
import { SmsService } from './services/sms.service';
import { DatabaseModule } from '../database/database.module';
import { SmsTemplateModule } from '../sms-template/sms-template.module';

@Module({
  imports: [DatabaseModule, SmsTemplateModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
