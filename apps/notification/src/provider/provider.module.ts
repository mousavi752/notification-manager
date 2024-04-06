import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProviderService } from './services/provider.service';
import { ProviderController } from './controllers/provider.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
