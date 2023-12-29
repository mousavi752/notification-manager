import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProviderService } from './services/provider.service';

@Module({
  imports: [DatabaseModule],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
