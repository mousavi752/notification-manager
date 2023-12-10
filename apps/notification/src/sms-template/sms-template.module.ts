import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SmsTemplateService } from './services/sms-template.service';

@Module({
  imports: [DatabaseModule],
  providers: [SmsTemplateService],
  exports: [SmsTemplateService],
})
export class SmsTemplateModule {}
