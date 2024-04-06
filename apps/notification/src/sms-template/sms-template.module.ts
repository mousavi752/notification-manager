import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SmsTemplateService } from './services/sms-template.service';
import { SmsTemplateController } from './controllers/sms-template.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SmsTemplateController],
  providers: [SmsTemplateService],
  exports: [SmsTemplateService],
})
export class SmsTemplateModule {}
