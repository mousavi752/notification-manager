import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EmailService } from './services/email.service';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [DatabaseModule, ProviderModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
