import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/services/database.service';
import { ProviderType } from '@prisma/db-notification';

@Injectable()
export class ProviderService {
  constructor(private readonly db: DatabaseService) {}

  async selectSmsProvider() {
    return await this.db.provider.findFirstOrThrow({
      where: {
        isActive: true,
        type: ProviderType.SMS,
      },
    });
  }

  async selectEmailProvider() {
    return await this.db.provider.findFirstOrThrow({
      where: {
        isActive: true,
        type: ProviderType.EMAIL,
      },
    });
  }
}
