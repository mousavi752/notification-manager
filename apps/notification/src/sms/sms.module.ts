import { Module } from '@nestjs/common';
import { SmsService } from './services/sms.service';
import { DatabaseModule } from '../database/database.module';
import { SmsTemplateModule } from '../sms-template/sms-template.module';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [DatabaseModule, SmsTemplateModule, ProviderModule],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
